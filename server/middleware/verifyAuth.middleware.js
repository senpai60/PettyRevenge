// middleware/verifyAuth.middleware.js
import jwt from "jsonwebtoken";
import { ENV_CONFIG } from "../config/env.config.js";

export const verifyAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Not authenticated",
      });
    }

    const decoded = jwt.verify(token, ENV_CONFIG.JWT_SECRET);

    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token",
    });
  }
};
