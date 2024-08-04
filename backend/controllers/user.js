const helper = require("../config/api-responses");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const requiredFields = ["name", "email", "password"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return helper.validationError(
          res,
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        );
      }
    }
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // Await bcrypt.hash
    const signup = await User.create({ name, email, password: hashedPassword });

    if (!signup) {
      return helper.errorResponse(res, "Unable to signup"); // Correct spelling
    } else {
      return helper.successResponseWithData(res, "Signup successful", signup);
    }
  } catch (error) {
    helper.logMessage(error);
    return helper.catchErrorResponse(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const requiredFields = ["email", "password"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return helper.validationError(
          res,
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        );
      }
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return helper.errorResponse(res, "User does not exist"); // Correct spelling
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email, // Use existingUser
        name: user.name,
        id: user.id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      user.token = token; // Use existingUser
      user.password = undefined;

      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user, // Use existingUser in response
        message: "Logged in successfully",
      });
    } else {
      return helper.errorResponse(res, "Password is incorrect"); // Correct spelling
    }
  } catch (error) {
    helper.logMessage(error);
    return helper.catchErrorResponse(res, error);
  }
};

exports.logout = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const deleteUser = await User.findByIdAndDelete(userId);
    if (deleteUser) {
      res.clearCookie("token");
      return helper.successResponse(res, "Logged out successfully");
    }
  } catch (error) {
    helper.logMessage(error);
    return helper.catchErrorResponse(res, error);
  }
};
