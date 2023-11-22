const jwt = require("jsonwebtoken");
const { comparePass, hashPassword } = require("../utils/helper");
const authModel = require("../models/authModel");
const secretKey = "AZMOIHTF&^16^%&@^*&56UTGUGFWY!DUYWUD&^%!";

const express = require("express");
const router = express.Router();

// 1. POST || LOGIN:
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const match = await comparePass(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Password not matched",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, username: user.username, email: user.email }, secretKey, { expiresIn: "3h" });


    // Store the user ID in the session
    req.session.userId = user._id;

    // Response with token and login details
    res.status(200).json({
      success: true,
      token,
      user: {
        username: user.username,
        email: user.email,
        userId: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};
router.post("/login", loginController);

// 2. POST || REGISTER:
const registerController = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Add validation for required fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }
  
      const existingUser = await authModel.findOne({ email });
  
      if (existingUser) {
        return res.status(200).json({
          success: false,
          message: "Already registered",
        });
      }
  
      const hashedPassword = await hashPassword(password);
      const newUser = await new authModel({
        username,
        email,
        password: hashedPassword,
      }).save();
  
      res.status(201).json({
        success: true,
        message: "Registered successfully",
        newUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  };
  router.post("/signup", express.urlencoded({ extended: true }), registerController);

module.exports = router;
