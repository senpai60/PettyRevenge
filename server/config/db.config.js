import mongoose from "mongoose";
import { logger } from "../utils/logger.js"; // your logger exports default
import { ENV_CONFIG } from "./env.config.js";

export const connectDb = async () => {
  try {
    await mongoose.connect(ENV_CONFIG.MONGODB_URI);

    logger.info("Connected to MongoDB successfully");
  } catch (err) {
    logger.error("MongoDB connection error: " + err.message);
    process.exit(1); // optional but recommended
  }
};
