import express from "express";
import { verifyAuth } from "../middleware/verifyAuth.middleware.js";
import {
  signup,
  login,
  logout,
  verify,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Auth Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify",verifyAuth, verify); 

export default router;
