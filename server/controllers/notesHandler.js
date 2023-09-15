import multer from "multer"
import { FileSchema } from "../models/Notes.js"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname } from "path"
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// importing multer configuration details

  
export const uploadFile = async (req, res) => {
  try {
    const { department, collegeName, semester, subject, unit, chapter } = req.body;
    const file = req.file;
    const filePath = file.filepath;
    // Check if a file with the same name already exists
    const existingFile = await FileSchema.findOne({ uniqueIdentifier: file.uniqueIdentifier });

    if (existingFile) {
      return res.status(400).json({
        status: "error",
        message: "File with the same name already exists.",
      });
    }

    const newFile = await FileSchema.create({
      name: req.file.filename,
      collegeName,
      department,
      semester,
      subject,
      unit,
      chapter,
      uniqueIdentifier: file.uniqueIdentifier,
      filePath,
    });

    res.status(200).json({
      status: "success",
      message: "File Uploaded successfully!",
    });
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
};



export const getAllNotes = async (req, res) => {
  try {
    const { department, semester, subject, unit } = req.body;
    const query = {
      department: department,
      semester: semester,
      subject: subject,
      unit: unit
    };

    const files = await FileSchema.find(query);
    const fileData = files.map(file => ({
      department: department,
      semester: semester,
      subject: subject,
      unit: unit,
      chapter: file.chapter,
      createdAt: file.createdAt,
      name: file.name
    }));

    res.status(200).json({ message: "success", files: fileData });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getNotesAll = async (req, res) => {
  try {

    const { collegeId } = req.params;

    const NotesData = await FileSchema.find({ collegeName: collegeId });
    ;

    res.status(200).json({ message: "Successfully Fetched Notes", notes: NotesData });

  } catch (error) {

  }
}


// try {
//   fs.unlinkSync(path.join(__dirname, "public", filePath));
// } catch (error) {
//   console.error(`Error deleting file: ${error}`);
// }

export const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await FileSchema.findById(id);
    const filePath = file.filePath;

    await FileSchema.findByIdAndDelete(id);

    try {
      fs.unlinkSync(path.join(__dirname, "public", filePath));
    } catch (error) {
      console.error(`Error deleting file: ${error}`);
    }

    res.status(200).json({ success: true, message: "Successfully Deleted Notes" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

}