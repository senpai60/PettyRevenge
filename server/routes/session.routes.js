import express from "express";
import { startSession, nextQuestion, finalGenerate } from "../controllers/session.controller.js";

const router = express.Router();

router.post("/start", startSession);
router.post("/next", nextQuestion);
router.post("/generate", finalGenerate);

export default router;
