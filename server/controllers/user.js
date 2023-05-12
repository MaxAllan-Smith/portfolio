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
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

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

    await user.save();

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

// VERIFIES THE ACCOUNT EMAIL TOKEN
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

    res
      .status(200)
      .send(
        "Email address verified successfully.\n-------------------\nRedirecting you back to the login page"
      );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error verifying email address.");
  }
});

// AUTHENTICATES THE LOGIN FOR THE USER
router.post("/login", async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    // Check if user exists in the database
    const user = await User.findOne({ emailAddress });

    if (!user) {
      return res.status(400).json({ message: "Invalid login credentials" });
    }

    if (user.emailVerified === false) {
      return res.status(401).json({ message: "User account has not been verified" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid login credentials" });
    }

    // Generate a JSON Web Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Assign the token to the user ID and store it in the cookies
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
})

module.exports = router;
