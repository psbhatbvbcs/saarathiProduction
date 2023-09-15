import mongoose from "mongoose";


const UserVerificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },

    uniqueString: {
        type: String,
        required: true,
        unique: true,
    },

    createdAt: {
        type: Date,
    },

    expiresAt: {
        type: Date,
    }

    
})

export const UserVerification = mongoose.model("UserVerification", UserVerificationSchema);

