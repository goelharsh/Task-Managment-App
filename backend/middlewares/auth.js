const jwt = require('jsonwebtoken');
const helper = require("../config/api-responses");

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      req.headers['authorization']?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    helper.logMessage(decoded);
    next();
  } catch (error) {
    helper.logMessage(error);
    res.status(500).json({
      message: "Something went wrong while validating the token",
      success: false,
    });
  }
};
