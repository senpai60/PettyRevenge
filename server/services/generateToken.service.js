import jwt from 'jsonwebtoken';
import { ENV_CONFIG } from '../config/env.config.js';

export const generateToken = (user) => {
    const payload = {
        userId : user._id,
        username : user.username,
        email : user.email,
    };

    const token = jwt.sign({user,payload},ENV_CONFIG.JWT_SECRET,{
        expiresIn : '1d'
    })
}