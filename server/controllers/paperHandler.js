import multer from "multer"
import { PaperSchema } from "../models/PrevPapers.js"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname } from "path"
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

export const uploadPaper = async (req, res) => {
    try {
      const { department, collegeName, semester, subject, exam } = req.body;
      const file = req.file;
      const filePath = file.filepath;
      // Check if a file with the same name already exists
      const existingFile = await PaperSchema.findOne({ uniqueIdentifier: file.uniqueIdentifier });
  
      if (existingFile) {
        return res.status(400).json({
          status: "error",
          message: "File with the same name already exists.",
        });
      }
  
      const newFile = await PaperSchema.create({
        name: req.file.filename,
        collegeName,
        department,
        semester,
        subject,
        exam,
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


  export const getAllPapers = async (req, res) => {
    try {
      const { department, semester, subject, exam } = req.body;
      const query = {
        department: department,
        semester: semester,
        subject: subject,
        exam: exam
      };
  
      const files = await PaperSchema.find(query);
      const fileData = files.map(file => ({
        department: department,
        semester: semester,
        subject: subject,
        exam: exam,
        createdAt: file.createdAt,
        name: file.name
      }));
  
      res.status(200).json({ message: "success", files: fileData });
    } catch (error) {
      res.status(500).json({ error });
    }
  };


  export const getPapersAll = async (req, res) => {
    try {
  
      const { collegeId } = req.params;
  
      const PapersData = await PaperSchema.find({ collegeName: collegeId });
      ;
  
      res.status(200).json({ message: "Successfully Fetched Papers", papers: PapersData });
  
    } catch (error) {
  
    }
  }


  export const deletePapers = async (req, res) => {
    try {
      const { id } = req.params;
  
      const file = await PaperSchema.findById(id);
      const filePath = file.filePath;
  
      await PaperSchema.findByIdAndDelete(id);
  
      try {
        fs.unlinkSync(path.join(__dirname, "public", filePath));
      } catch (error) {
        console.error(`Error deleting file: ${error}`);
      }
  
      res.status(200).json({ success: true, message: "Successfully Deleted Papers" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  
  }