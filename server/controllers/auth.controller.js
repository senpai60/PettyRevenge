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

    // ⭐ SET COOKIE HERE
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,       // ❗ MUST be false on localhost
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

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

    const token = generateToken(user);

    // ⭐ SET COOKIE HERE
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ❗ MUST be false on localhost
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return sendSuccess(res, 200, "Login successful", {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return sendSuccess(res, 200, "Logged out");
  } catch (err) {
    next(err);
  }
};

export const verify = async (req, res, next) => {
  try {
    return sendSuccess(res, 200, "User verified", {
      user: req.user || null,
    });
  } catch (err) {
    next(err);
  }
};
