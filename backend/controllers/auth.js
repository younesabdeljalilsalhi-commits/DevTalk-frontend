import csrf from "csrf";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";


import { User } from "../models/User.js";
import { EmailVerification } from "../models/EmailVerification.js";
import { transporter } from "../utils/emailTransporter.js";
import { createJWT } from "../utils/jwtAuth.js";
import { generateVerificationString } from "../utils/verifCode.js"


export async function requestEmailVerification(req, res, next){

    const username = req.body.username;
    const email = validator.normalizeEmail(req.body.email);
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword; 

    //! input validation : 
    if (!username || !email || !password || !confirmPassword) {
        return res.status(422).json({ message: "All fields are required." });
    }
    else if(!validator.isLength(username, {min: 5, max: 20})){
        return res.status(422).json({message: "Username must be 5-20 characters long."});
    }
    else if(!validator.isAlphanumeric(username.replace(/\s+/g, '').trim() , "en-US", { ignore: "_.-" })){
        return res.status(422).json({message: "Username contains invalid characters."});
    }
    else if(!validator.isEmail(email)){
        return res.status(422).json({message: "Invalid email address."});
    }
    else if(await User.findOne({email: email})){
        return res.status(409).json({message: "Email address already in use."});
    }
    else if(!validator.isLength(password, {min: 8, max: 30})){
        return res.status(422).json({message: "Password must be 8-30 characters long."});
    }
    else if(!validator.isStrongPassword(password, {
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 0
    })){
        return res.status(422).json({message: "Password must include uppercase, lowercase and number."})
    }
    else if(confirmPassword !== password){
        return res.status(422).json({message: "Passwords do not match."});
    }    

    // ! generate & send verification code: 
    const verificationCode = generateVerificationString();
      
    transporter.sendMail({
        from: "DevTalk team <dev-talk@gmail.com>",
        to: email,
        subject: "Your new DevTalk verification code",
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f4; padding: 10px; text-align: center;">
                <div style="max-width: 520px; margin: auto; background-color: #ffffff; border-radius: 14px; box-shadow: 0 6px 14px rgba(0,0,0,0.1); overflow: hidden;">

                    <div style="background: linear-gradient(135deg, #1e88e5, #42a5f5); color: white; padding: 22px;">
                        <h1 style="margin: 0; font-size: 24px;">Verification Code</h1>
                    </div>

                    <div style="padding: 25px; color: #333;">
                        <h2 style="color: #1e88e5; font-size: 20px; margin-bottom: 10px;">
                            Hey ${username},
                        </h2>

                        <p style="font-size: 15px; line-height: 1.6;">
                            You requested a new verification code for your <strong>DevTalk</strong> account.
                            Enter the code below to continue.
                        </p>

                        <h3 style="color: #1e88e5; font-size: 22px; margin: 20px 0;">
                            ${verificationCode}
                        </h3>

                        <p style="font-size: 14px; line-height: 1.6; color: #555;">
                            This verification code will expire in <strong>3 minutes</strong>.
                        </p>

                        <p style="font-size: 15px; line-height: 1.6;">
                            If you didn’t request this, you can safely ignore this email.
                        </p>

                        <p style="font-size: 16px; margin-top: 25px; font-weight: 600; color: #1e88e5;">
                            The DevTalk Team
                        </p>
                    </div>

                    <div style="background-color: #f0f0f0; padding: 12px; font-size: 12px; color: #777;">
                        <p>© ${new Date().getFullYear()} DevTalk. All rights reserved.</p>
                    </div>

                </div>
            </div>
        `
    });


    //! password hashing: 
    const hashedPassword = await bcrypt.hash(password, 12);

    //! save verification info in db:
    const emailVerification = new EmailVerification({
        username: username,
        email: email,
        password: hashedPassword,
        code: verificationCode,
        expiresAt: new Date(Date.now() + 3 * 60 * 1000)  // code will expire after 3mins
    });

    emailVerification.save();
    res.status(200).json({message: `Verfication code sent to: ${email}`})
}

export async function resendVerificationCode(req, res, next){

    const email = validator.normalizeEmail(req.body.email);

    //! validate the email
    if (!email || !validator.isEmail(email)) {
        return res.status(422).json({ message: "Valid email is required." });
    }
    if(await User.findOne({email: email})){
        return res.status(409).json({message: "Email address already verified"})
    }

    const emailVerification = await EmailVerification.findOne({ email });

    if(!emailVerification){
        return res.status(404).json({message: "No verification request found"});
    }
    //! generate new code
    const verificationCode = generateVerificationString(); 

    emailVerification.code = verificationCode;
    emailVerification.expiresAt = new Date(Date.now() + 3 * 60 * 1000)  // code will expire after 3mins

    await emailVerification.save();

    await transporter.sendMail({
        from: "DevTalk team <dev-talk@gmail.com>",
        to: email,
        subject: "Your new DevTalk verification code",
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f4; padding: 10px; text-align: center;">
                <div style="max-width: 520px; margin: auto; background-color: #ffffff; border-radius: 14px; box-shadow: 0 6px 14px rgba(0,0,0,0.1); overflow: hidden;">

                    <div style="background: linear-gradient(135deg, #1e88e5, #42a5f5); color: white; padding: 22px;">
                        <h1 style="margin: 0; font-size: 24px;">Verification Code</h1>
                    </div>

                    <div style="padding: 25px; color: #333;">
                        <h2 style="color: #1e88e5; font-size: 20px; margin-bottom: 10px;">
                            Hey ${emailVerification.username},
                        </h2>

                        <p style="font-size: 15px; line-height: 1.6;">
                            You requested a new verification code for your <strong>DevTalk</strong> account.
                            Enter the code below to continue:
                        </p>

                        <h3 style="color: #1e88e5; font-size: 22px; margin: 20px 0;">
                            ${verificationCode}
                        </h3>

                        <p style="font-size: 15px; line-height: 1.6;">
                            This code will expire in 3 minutes.<br>
                            If you didn’t request this, you can safely ignore this email.
                        </p>

                        <p style="font-size: 16px; margin-top: 25px; font-weight: 600; color: #1e88e5;">
                            The DevTalk Team
                        </p>
                    </div>

                    <div style="background-color: #f0f0f0; padding: 12px; font-size: 12px; color: #777;">
                        <p>© ${new Date().getFullYear()} DevTalk. All rights reserved.</p>
                    </div>

                </div>
            </div>
        `
    });

    return res.status(200).json({message:`New verification code sent to ${email}`})

}


export async function verifyEmailAndCreateUser(req, res, next){
    
    const email = req.body.email;
    const verificationCode = req.body.verificationCode;
    let user;

    // ! verify the code validity
    const emailVerification = await EmailVerification.findOne({email: email});

    if(!emailVerification || emailVerification.code !== verificationCode || emailVerification.expiresAt < Date.now()){
        return res.status(401).json({message: "Invalid or expired code"})
    }

    try{
        // ! saving user to db: 
        user = new User({
            username: emailVerification.username,
            email,
            password: emailVerification.password,
            friends: []
        })
        await user.save();

    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Registration failed."});
    }

    //! log the user in: 
    const token = createJWT(user);

    return res.status(201).json({
        message: "Account created successfully",
        jwt: token
    });
}


export async function login(req, res, next){

    const email = validator.normalizeEmail(req.body.email);
    const password = req.body.password;

    const user = await User.findOne({email: email});

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createJWT(user);

    res.status(200).json({
        message: "Logged in successfully.",
        jwt: token
    })
}


export async function resetPassword(req, res, next){
    const email = req.body.email;

    // ! create special token:
    const buffer = await crypto.randomBytes(32);
    const token = buffer.toString('hex');

    const user = await User.findOne({email: email});
    if(!user) return res.status(404).json({message: "No user with that email address found"});

    user.resetToken = token;
    user.resetTokenExpiration = new Date(Date.now() + 3600 * 1000); // the link is valid for 1h

    try{
        await user.save();
    }catch(err){
        console.log(err);
    }


    //! send resetting link
    const resetLink = `http://localhost:5173/set-new-password/${token}`
    console.log(resetLink);
    
    await transporter.sendMail({
        from: "DevTalk team <dev-talk@gmail.com>",
        to: email,
        subject: "Reset your DevTalk password",
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f4; padding: 10px; text-align: center;">
                <div style="max-width: 520px; margin: auto; background-color: #ffffff; border-radius: 14px; box-shadow: 0 6px 14px rgba(0,0,0,0.1); overflow: hidden;">

                    <div style="background: linear-gradient(135deg, #1e88e5, #42a5f5); color: white; padding: 22px;">
                        <h1 style="margin: 0; font-size: 24px;">Reset Your Password</h1>
                    </div>

                    <div style="padding: 25px; color: #333;">
                        <h2 style="color: #1e88e5; font-size: 20px; margin-bottom: 10px;">
                            Hey ${user.username},
                        </h2>

                        <p style="font-size: 15px; line-height: 1.6;">
                            We received a request to reset your DevTalk password.
                            Click the link below to set a new password:
                        </p>

                        <h3 style="color: #1e88e5; font-size: 18px; margin: 20px 0;">
                            <a href="${resetLink}" style="color: #1e88e5; text-decoration: none;">Click Here</a>
                        </h3>

                        <p style="font-size: 14px; line-height: 1.6; color: #555;">
                            This link is valid for <strong>1 hour</strong>. After that, you will need to request a new link.
                        </p>

                        <p style="font-size: 15px; line-height: 1.6;">
                            If you didn't request this, you can safely ignore this email.
                        </p>

                        <p style="font-size: 16px; margin-top: 25px; font-weight: 600; color: #1e88e5;">
                            The DevTalk Team
                        </p>
                    </div>

                    <div style="background-color: #f0f0f0; padding: 12px; font-size: 12px; color: #777;">
                        <p>© ${new Date().getFullYear()} DevTalk. All rights reserved.</p>
                    </div>

                </div>
            </div>
        `
    });

    return res.status(200).json({message: `Password resetting email sent to: ${user.email}`})
}

export async function setNewPassword(req, res, next){

    const token = req.body.token;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const user = await User.findOne({resetToken: token});

    //! check token validility

    if(!user){
        return res.status(401).json({message: "Invalid resetting token"})
    }
    else if(user.resetTokenExpiration < Date.now()){
        return res.status(401).json({message: "Expired resetting token"})
    }

    //! validate new password: 
    if (!password || !confirmPassword) {
        return res.status(422).json({ message: "All fields are required." });
    }
    else if(!validator.isLength(password, {min: 8, max: 30})){
        return res.status(422).json({message: "Password must be 8-30 characters long."});
    }
    else if(!validator.isStrongPassword(password, {
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 0
    })){
        return res.status(422).json({message: "Password must include uppercase, lowercase and number."})
    }
    else if(confirmPassword !== password){
        return res.status(422).json({message: "Passwords do not match."});
    }

    //! hash the new password:
    const hashedPassword = await bcrypt.hash(password, 12)
    user.password = hashedPassword;

    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    //! save user data:
    try{
        await user.save()

    }catch(err){
        console.log(err);
    }
    return res.status(200).json({message: "Password updated successfully"})
}

//! to improve : 
// You imported csrf but didn’t implement it yet

//! to learn:
// git and github collaboration
// csrf protection
// jwt playlist
// CORS request (preflight)

// ! authentication flow: 

// 1st controller: validate input -> send verification email
// 2nd controller: verify mail -> create user
// 3rd controller: set user bio
// 4rh controller: set user profile 