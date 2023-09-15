import fs from "fs"
import { fileURLToPath } from "url"
import { dirname } from "path"
import path from "path"
import { SeniorPostsSchema } from "../models/SeniorPost.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));
 
// importing multer configuration details


export const uploadSeniorPost = async (req, res) => {
    try {
        const { department, collegeName, category, title, valuable, content, author, fileType } = req.body;
        const file = req.file;
        const filePath = file.filepath;
        // Check if a file with the same name already exists
        const existingFile = await SeniorPostsSchema.findOne({ title: title });

        if (existingFile) {
            return res.status(400).json({
                status: "error",
                message: "Post with the same title already exists.",
            });
        }

        const newFile = await SeniorPostsSchema.create({
            department,
            collegeName,
            category,
            title,
            valuable,
            content,
            author,
            fileType,
            filePath,
        });

        res.status(200).json({
            status: "success",
            message: "Post Uploaded successfully!",
        });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};



export const getSeniorTalks = async (req, res) => {
    try {

        const { collegeId } = req.params;

        const SeniorPostsData = await SeniorPostsSchema.find({ collegeName: collegeId });
        ;

        res.status(200).json({ message: "Successfully Fetched Notes", seniors: SeniorPostsData });

    } catch (error) {

    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await SeniorPostsSchema.findById(id);
        const postFilePath = post.filePath;

        await SeniorPostsSchema.findByIdAndDelete(id);

        try {
            fs.unlinkSync(path.join(__dirname, "public", postFilePath));
        } catch (error) {
            console.error(`Error deleting file: ${error}`);
        }

        res.status(200).json({ success: true, message: "Successfully Deleted Post" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}