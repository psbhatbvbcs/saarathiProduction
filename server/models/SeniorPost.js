import { mongoose } from "mongoose"

const seniorPostSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    collegeName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    valuable: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    }

})

export const SeniorPostsSchema = mongoose.model("SeniorTalks", seniorPostSchema);