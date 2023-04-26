const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

// REGISTER USER AND SEND VERIFICATION EMAIL
router.post("/register", async (req, res) => {
  try {
    const {
      userName,
      firstName,
      lastName,
      emailAddress,
      password,
      profilePicture,
      friends,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      firstName,
      lastName,
      emailAddress,
      password: passwordHash,
      profilePicture,
      friends,
      friendRequests: [],
      blockedFriends: [],
      location: "",
      bio: "",
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
