import fs from "fs"
import { fileURLToPath } from "url"
import { dirname } from "path"
import path from "path"
import { ClubsInfoSchema } from "../models/ClubInfo.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));
 
// importing multer configuration details


export const uploadClubInfo = async (req, res) => {
    try {
        const { collegeName, clubName, clubDescription, contactDetails, fileType } = req.body;
        const file = req.file;
        const filePath = file.filepath;
        // Check if a file with the same name already exists
        const existingFile = await ClubsInfoSchema.findOne({ clubName: clubName });

        if (existingFile) {
            return res.status(400).json({
                status: "error",
                message: "Club with the same name already exists.",
            });
        }

        const newFile = await ClubsInfoSchema.create({
            collegeName,
            clubName,
            clubDescription,
            contactDetails,
            fileType,
            logoPath: filePath,
        });

        res.status(200).json({
            status: "success",
            message: "Club Info Uploaded successfully!",
        });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};



export const getClubsInfo = async (req, res) => {
    try {

        const { collegeId } = req.params;

        const ClubsInfoData = await ClubsInfoSchema.find({ collegeName: collegeId });

        res.status(200).json({ message: "Successfully Fetched Clubs Info", clubs: ClubsInfoData });

    } catch (error) {

    }
}

export const deleteClub = async (req, res) => {
    try {
        const { id } = req.params;

        const club = await ClubsInfoSchema.findById(id);
        const logoFilePath = club.logoPath;

        await ClubsInfoSchema.findByIdAndDelete(id);

        try {
            fs.unlinkSync(path.join(__dirname, "public", logoFilePath));
        } catch (error) {
            console.error(`Error deleting file: ${error}`);
        }

        res.status(200).json({ success: true, message: "Successfully Deleted Club" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}