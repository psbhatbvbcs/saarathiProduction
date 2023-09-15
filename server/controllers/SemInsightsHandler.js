import fs from "fs"
import { fileURLToPath } from "url"
import { dirname } from "path"
import path from "path"
import { SemInsightsSchema } from "../models/SemInsights.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// importing multer configuration details


export const uploadSemInsight = async (req, res) => {
    try {
        const { department, collegeName, title, content, semester } = req.body;
        
        // Check if a file with the same name already exists
        const existingFile = await SemInsightsSchema.findOne({ semester: semester });

        if (existingFile) {
            return res.status(400).json({
                status: "error",
                message: "An insight for the same semester already exists.",
            });
        }

        const newFile = await SemInsightsSchema.create({
            department,
            collegeName,
            title,
            content,
            semester
        });

        res.status(200).json({
            status: "success",
            message: "Insight Uploaded successfully!",
        });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};



export const getSemInsights = async (req, res) => {
    try {

        const { collegeId } = req.params;

        const SemInsightsData = await SemInsightsSchema.find({ collegeName: collegeId });

        res.status(200).json({ message: "Successfully Fetched Insights", insights: SemInsightsData });

    } catch (error) {

    }
}

export const deleteInsight = async (req, res) => {
    try {
        const { id } = req.params;

        const insight = await SemInsightsSchema.findById(id);

        await SemInsightsSchema.findByIdAndDelete(id);


        res.status(200).json({ success: true, message: "Successfully Deleted Insight" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}