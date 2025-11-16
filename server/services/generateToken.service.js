// services/generateToken.service.js
import jwt from "jsonwebtoken";
import { ENV_CONFIG } from "../config/env.config.js";

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
  };

  return jwt.sign(payload, ENV_CONFIG.JWT_SECRET, {
    expiresIn: "1d",
  });
};
