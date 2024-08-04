const express = require('express');
const router = express.Router();
const userController = require("../controllers/user")

// Signup route
router.post('/signup', userController.signup);

// Login route
router.post('/login', userController.login);
router.post('/logout', userController.logout);
 
module.exports = router;
