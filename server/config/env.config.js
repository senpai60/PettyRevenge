import dotenv from 'dotenv';
dotenv.config()

export const ENV_CONFIG = {
    JWT_SECRET : process.env.JWT_SECRET,
    MONGODB_URI:process.env.MONGODB_URI
}