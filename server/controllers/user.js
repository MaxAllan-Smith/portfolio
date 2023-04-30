const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const User = require("../models/User.js");

// REGISTER USER AND SEND VERIFICATION EMAIL
router.post("/register", async (req, res) => {
  try {
    // Hash the user's password with bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user object with the hashed password
    const user = new User({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      password: hashedPassword,
      verificationToken: jwt.sign(
        { email: req.body.emailAddress },
        process.env.JWT_SECRET
      ),
      profilePicture: req.body.profilePicture,
      friends: req.body.friends,
      friendRequests: req.body.friendRequests,
      blockedFriends: req.body.blockedFriends,
      location: req.body.location,
      bio: req.body.bio,
    });

    // Save the user to the database
    await user.save();

    // Send verification email to the user
    const transporter = nodemailer.createTransport(
      smtpTransport({
        host: "smtpout.secureserver.net",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      })
    );

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: req.body.emailAddress,
      subject: "Verify your email address",
      text: `Please click on the following link to verify your email address:\n\n${process.env.BASE_URL}/users/verify-email/${user.verificationToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).send("User registered successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error registering user.");
  }
});

router.get("/verify-email/:token", async (req, res) => {
  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET);

    // Find the user with the corresponding email address
    const user = await User.findOne({ emailAddress: decodedToken.email });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Mark the user's email address as verified
    user.emailVerified = true;

    // Save the updated user object to the database
    await user.save();

    res.status(200).send("Email address verified successfully.\n-------------------\nRedirecting you back to the login page");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error verifying email address.");
  }
});

router.get("/login", async (req, res) => {});

module.exports = router;
