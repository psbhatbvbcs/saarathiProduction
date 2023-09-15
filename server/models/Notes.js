import { mongoose } from "mongoose"

const fileSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    collegeName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true,
    },
    name: {
        type: String,
        required: [true, "Uploaded file must have a name!"],
    },
    department: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    chapter: {
        type: String,
        required: true,
    },
    uniqueIdentifier: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    }

})

export const FileSchema = mongoose.model("File", fileSchema);