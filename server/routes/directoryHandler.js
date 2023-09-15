import express from "express"
import { createDirectory } from "../controllers/createDirectory.js";

const router = express.Router()

router.post("/createDirectories", createDirectory);

export default router;