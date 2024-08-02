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

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return helper.errorResponse(res, "User does not exist"); // Correct spelling
    }
    if (await bcrypt.compare(password, existingUser.password)) {
      const payload = {
        email: existingUser.email, // Use existingUser
        name: existingUser.name,
        id: existingUser.id
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      existingUser.token = token; // Use existingUser
      existingUser.password = undefined;

      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user: existingUser, // Use existingUser in response
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
