import User from "../models/User.model.js";
import { generateToken } from "../services/generateToken.service.js";
import {
  sendSuccess,
  sendFail,
  sendCreated,
} from "../utils/responseHandler.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return sendFail(res, "Email already registered", 400);
    }

    const newUser = await User.create({ username, email, password });

    const token = generateToken(newUser);

    return sendCreated(res, "User created successfully", {
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return sendFail(res, "Invalid credentials", 401);

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return sendFail(res, "Invalid credentials", 401);

    // If using JWT:
    const token = generateToken(user);

    return sendSuccess(res, 200, "Login successful", {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      // token,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    // If using cookies:
    res.clearCookie("token");

    return sendSuccess(res, 200, "Logged out");
  } catch (err) {
    next(err);
  }
};

export const verify = async (req, res, next) => {
  try {
    // Only if using JWT + middleware that sets req.user
    // const user = await User.findById(req.user.id);

    return sendSuccess(res, 200, "User verified", {
      user: req.user || null,
    });
  } catch (err) {
    next(err);
  }
};
