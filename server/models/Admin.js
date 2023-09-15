import mongoose from "mongoose";


const AdminSchema = new mongoose.Schema({
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
    },
    role: {
        type: String,
        enum: ["admin", "superAdmin"],
        default: "admin",
    },
    verified: {
        type: Boolean,
    },

    token:{
        type:String,
        default:'',
    },

    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: false,
    },
},
    {
        timestamps: true,
    }
);

export const Admins = mongoose.model("Admins", AdminSchema);

