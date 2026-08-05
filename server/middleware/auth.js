import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { getDbStatus } from "../config/db.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "super_secret_jwt_key_portfolio_2026_antigravity"
      );

      if (getDbStatus()) {
        req.user = await User.findById(decoded.id).select("-password");
      } else {
        req.user = { id: decoded.id, username: decoded.username || "admin", role: "admin" };
      }

      return next();
    } catch (error) {
      console.error("[Auth Middleware] JWT Verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};
