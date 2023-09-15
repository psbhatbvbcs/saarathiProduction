import express from "express"
import { getAllNotes, uploadFile, getNotesAll, deleteNotes } from "../controllers/notesHandler.js";
import multer from "multer";
import { multerStorage, multerFilter } from "../data/multerConfiguration.js"
import { authMiddlewareAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router()

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})


router.post("/uploadFile", upload.single('myFile'), uploadFile);
router.post("/getAllNotes", authMiddlewareAdmin, getAllNotes);
router.get("/getNotes/all/:collegeId", getNotesAll)
router.delete("/deleteNotes/:id", authMiddlewareAdmin, deleteNotes)


export default router;