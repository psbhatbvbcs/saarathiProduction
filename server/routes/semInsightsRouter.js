import express from "express"
import { uploadSemInsight, getSemInsights, deleteInsight } from "../controllers/SemInsightsHandler.js";
import { authMiddlewareAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router()

router.post("/uploadSemInsight", authMiddlewareAdmin, uploadSemInsight);
router.get("/getSemInsights/all/:collegeId", getSemInsights)
router.delete("/deleteInsight/:id", authMiddlewareAdmin, deleteInsight)

export default router; 