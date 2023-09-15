import express from "express"
import { getSeniorTalks, uploadSeniorPost, deletePost } from "../controllers/SeniorPostsHandler.js";
import multer from "multer";
import { multerStorage, multerFilter } from "../data/multerConfiguration.js"
import { authMiddlewareAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router()

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})


router.post("/uploadSeniorPost", authMiddlewareAdmin, upload.single('myFile'), uploadSeniorPost);
router.get("/getSeniorTalks/all/:collegeId", getSeniorTalks)
router.delete("/deletePost/:id", authMiddlewareAdmin, deletePost)

export default router;