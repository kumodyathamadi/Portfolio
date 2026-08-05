import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { getDbStatus } from "../config/db.js";

const generateToken = (id, username) => {
  return jwt.sign(
    { id, username },
    process.env.JWT_SECRET || "super_secret_jwt_key_portfolio_2026_antigravity",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please provide both username and password" });
    }

    if (getDbStatus()) {
      const user = await User.findOne({ username: username.toLowerCase() });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          _id: user._id,
          username: user.username,
          role: user.role,
          token: generateToken(user._id, user.username),
        });
      }
    } else {
      // Offline / fallback mode login check
      if (username.toLowerCase() === "admin" && password === "admin123") {
        return res.json({
          _id: "admin_fallback_id",
          username: "admin",
          role: "admin",
          token: generateToken("admin_fallback_id", "admin"),
        });
      }
    }

    return res.status(401).json({ message: "Invalid username or password" });
  } catch (error) {
    console.error("[Login Error]", error);
    res.status(500).json({ message: "Server error during authentication" });
  }
};

export const getMe = async (req, res) => {
  res.json({
    user: req.user,
  });
};
