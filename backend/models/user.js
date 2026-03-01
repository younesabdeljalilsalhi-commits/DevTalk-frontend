import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    friends: [{ 
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    profileImgUrl: {
        type: String
    },
    bio: {
        type: String
    },
    online: {
        type: Boolean,
        default: false
    },
    lastSeen: {
        type: Date,
        default: Date.now()
    },
    resetToken: String,
    resetTokenExpiration: Date
},{
    timestamps: true
});

export const User = mongoose.model('User', userSchema)
