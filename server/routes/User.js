import express from "express"
import bcrypt from "bcrypt"
import { signin, signup, verifyUser, userVerified, logout, getUser, updateProfile, getUserById } from "../controllers/user.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";
import multer from "multer";
import { multerStorage, multerFilter } from "../data/multerConfiguration.js"
import { authMiddlewareAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();


const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

//sign up

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/verify/user/:userId/:uniqueString", verifyUser);
router.get("/verified", userVerified);

//log in 
// router.post("/login", (req, res) => {

// }) 

router.get("/getuser/me", authMiddleware, getUser)
router.get("/getUser/:userId", authMiddleware, getUserById)
router.post("/updateProfile", authMiddleware, upload.single("myFile"),  updateProfile)

router.get("/logout", logout);



export default router;
