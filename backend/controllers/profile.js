import {User} from "../models/user.js";
import { uploadImage } from "../utils/cloudinary.js";


export async function getProfile(req, res, next){
    const userId = req.userId
    let user
    try{

        user = await User.findOne({_id: userId})
            .select('username', 'bio', 'profileImgUrl', 'email')
        if(!user){
            return res.status(404).json({message: "User not found."});
        }
        return res.status(200).json({
            message: "User data was sent successfully",
            user
        })
    }catch(err){
        console.log("getProfile error", err.message);
        return res.status(500).json({message: "Internal server error"});
    }
}


export async function editProfile(req, res, next){
    const userId = req.userId;
    const username = req.body.username;
    const bio = req.body.bio;
    const image = req.file;
    let user;

    try{
        user = await User.findOne({_id: userId});
        if(!user){
            return res.status(404).json({message: "User not Found!"});
        }
        user.username = username;
        user.bio = bio;
        await user.save();
        if(image){

        }
    }
    catch(err){
        return res.status(500).json({message: "Internal server error"});
    }
}