import multer from "multer";
import path from "path";
import fs from "fs";


export const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {

    let { department, semester, subject, fileType = "" } = req.body;
    
    let destinationPath;

    if (fileType == "profilePic" || fileType == "profilePicUser") {
      destinationPath = `public/files/KLE Technological University/${department}/profilePics/`;
    } else if (fileType == "clubLogo") {
      destinationPath = `public/files/KLE Technological University/clubLogos/`;
    } else {
      destinationPath = `public/files/KLE Technological University/${department}/${semester}/${subject}`;
    }

    // Ensure the destination directory exists, or create it
    fs.mkdir(destinationPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, destinationPath);
    });

  },
  filename: (req, file, cb) => {
    let { department, semester = "", subject = "", fileType = "" } = req.body;

    const ext = file.originalname.split(".").pop(); // Get the file extension
    const filename = file.originalname.split(".")[0]; // Replace spaces with underscores in the chapter name

    let fileName = `${file.originalname}`

    let filePath;
    let uniqueIdentifier = "";


    if (fileType == "profilePic") {
      fileName = `${req.body.author}_${file.originalname}`;
      filePath = `/files/KLE Technological University/${department}/profilePics/${fileName}`;
    } else if (fileType == "profilePicUser") {
      fileName = `${req.user._id}_${file.originalname}`;
      filePath = `/files/KLE Technological University/${department}/profilePics/${fileName}`;
    } else if (fileType == "clubLogo") {
      fileName = `${req.body.clubName}_${file.originalname}`;
      filePath = `/files/KLE Technological University/clubLogos/${fileName}`;
    } else {
      filePath = `/files/KLE Technological University/${department}/${semester}/${subject}/${fileName}`
      uniqueIdentifier = `${req.body.subject}-${filename}-${req.body.semester}.${ext}`;
    }


    file.filepath = filePath;
    file.uniqueIdentifier = uniqueIdentifier;

    cb(null, fileName);
  },
});


export const multerFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (fileExtension === '.pdf' || fileExtension === ".doc" || fileExtension === ".docx" || fileExtension === ".txt" || fileExtension === ".ppt" || fileExtension === ".pptx" || fileExtension === ".xls" || fileExtension === ".xlsx" || fileExtension === ".jpg" || fileExtension === ".jpeg" || fileExtension === ".png") {
    cb(null, true);
  } else {
    cb(new Error("This file extension is not allowed!"), false);
  }
}



