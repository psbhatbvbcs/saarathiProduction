import express from "express"
import { uploadLink, getLinksAll, deleteLinks } from "../controllers/linksHandler.js";
import multer from "multer";
import { authMiddlewareAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router()


router.post("/uploadLink", authMiddlewareAdmin, uploadLink);
router.get("/getLinks/all/:collegeId", getLinksAll)
router.delete("/deleteLinks/:id", authMiddlewareAdmin, deleteLinks)

export default router;