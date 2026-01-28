import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export function createJWT(user){

    const payload = {
        userId: user._id,
        username: user.username
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '24h'});

    return token
}