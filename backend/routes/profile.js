import express from "express";
import { isAuth } from "../../../Marini-website/backend/utils/jwtAuth.js";
import { editProfile, getProfile } from "../controllers/profile.js";

export const router = express.Router();

router.get('/get-profile', isAuth(), getProfile);

router.put('/edit-profile', isAuth(), editProfile);