import express from "express";
import {requestEmailVerification, verifyEmailAndCreateUser, login, resendVerificationCode, resetPassword, setNewPassword} from "../controllers/auth.js";

export const router = express.Router();

router.post('/request-verification', requestEmailVerification);

router.post('/verify-email', verifyEmailAndCreateUser);

router.post('/login', login);

router.post('/resend-verification-code', resendVerificationCode);

router.post('/reset-password', resetPassword);

router.post('/set-new-password', setNewPassword);

// ! logout is done by front-end