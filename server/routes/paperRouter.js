import express from "express"
import { getAllPapers, uploadPaper, getPapersAll, deletePapers } from "../controllers/paperHandler.js";
import multer from "multer";
import { multerStorage, multerFilter } from "../data/multerConfiguration.js"
import { authMiddlewareAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router()
 
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})


router.post("/uploadPaper", authMiddlewareAdmin, upload.single('myFile'), uploadPaper);
router.get("/getPapers/all/:collegeId", getPapersAll)
router.delete("/deletePapers/:id", authMiddlewareAdmin, deletePapers)


export default router;