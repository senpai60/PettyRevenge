import { GoogleGenAI } from "@google/genai";
import { ENV_CONFIG } from "./env.config.js";

export const ai = new GoogleGenAI({
  apiKey: ENV_CONFIG.GEMINI_API_KEY
});

// IMPORTANT: NO getGenerativeModel()
// You use ai.models.generateContent({ model, contents })
export const gemini = ai.models;
