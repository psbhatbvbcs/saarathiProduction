import express from "express"
import { uploadClubInfo, getClubsInfo, deleteClub } from "../controllers/ClubsHandler.js";
import multer from "multer";
import { multerStorage, multerFilter } from "../data/multerConfiguration.js"
import { authMiddlewareAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router()

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})


router.post("/uploadClubInfo", upload.single('myFile'), uploadClubInfo);
router.get("/getClubs/all/:collegeId", getClubsInfo)
router.delete("/deleteClub/:id", authMiddlewareAdmin, deleteClub)
router.get("/searchPost", (req, res) => {
    res.status(200).render("findNotes")
})

export default router;