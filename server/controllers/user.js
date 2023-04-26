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

router.get("/login", async (req, res) => {
  try {
    const user = await User.findOne({ emailAddress: req.body.emailAddress });

    if (user == null) {
      return res.status(400).send("User Not Found");
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
      res.status(200).send("Success");
    } else {
      res.status(401).send("Invalid Login Details");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
