import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export function createJWT(user){

    const payload = {
        userId: user._id,
        username: user.username
    }
    const config = {
        expiresIn: '24h',
        issuer: 'DevTalk-website',
        audience: 'DevTalk-website-users'
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY, config);

    return token
}

// ! verify authentication function (routes protection)

export function isAuth(req, res, next){

    try{
        // ? req.body.token or header-bearer
        const decoded = jsonwebtoken.verify(req.body.token, jwtSecretKey, {
            issuer: "Marini-website",
            audience: "Marini-website-users"
        });
        req.userId = decoded.userId;
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).json({message: "Not Authorized"});
    }
}