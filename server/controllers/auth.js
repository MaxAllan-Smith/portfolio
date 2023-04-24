import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { json } from "body-parser";

// REGISTER USER
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      profilePicture,
      friends,
      friendRequests,
      blockedFriends,
      location,
      bio,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      emailAddress,
      password: passwordHash,
      profilePicture,
      friends,
      friendRequests,
      blockedFriends,
      location,
      bio,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
