import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    tokenId: {
        type: String,
        default: "",
    },
    expiresAt: {
        type: Date,
    },
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    dateOfBirth: {
        type: Date,
    },

    verified: {
        type: Boolean,
    },

    token: TokenSchema, // Embedding the TokenSchema here

    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    // New fields to be added
    badges: [
        {
            type: String,
        },
    ],

    semester: {
        type: String,
    },

    description: {
        type: String,
    },

    profilePicture: {
        type: String, // You can store the file path or URL here
    },
});

export const User = mongoose.model("Users", UserSchema);
