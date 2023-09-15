import { LinksSchema } from "../models/Links.js"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname } from "path"
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

export const uploadLink = async (req, res) => {
    try {
        const { department, collegeName, semester, linkName, linkAddress } = req.body;

        // Check if a file with the same name already exists
        const existingFile = await LinksSchema.findOne({ linkName: linkName });

        if (existingFile) {
            return res.status(400).json({
                status: "error",
                message: "Link with the same name already exists.",
            });
        }

        const newLink = await LinksSchema.create({
            collegeName,
            department,
            semester,
            linkName,
            linkAddress,
        });

        res.status(200).json({
            status: "success",
            message: "Link Uploaded successfully!",
        });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};


export const getLinksAll = async (req, res) => {
    try {

        const { collegeId } = req.params;

        const LinksData = await LinksSchema.find({ collegeName: collegeId });

        res.status(200).json({ message: "Successfully Fetched Links", links: LinksData });

    } catch (error) {

    }
}


export const deleteLinks = async (req, res) => {
    try {
        const { id } = req.params;


        await LinksSchema.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Successfully Deleted Link" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}