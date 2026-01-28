import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EmailVerificationSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date, 
        required: true,
        index: {expire: 0}
    }
},{
    timestamps: true
});

export const EmailVerification = mongoose.model('EmailVerification', EmailVerificationSchema);