import express from "express"
import { addCollege } from "../controllers/addCollege.js";
import { adminSignin, adminSignup, getAdmin, verifyAdmin, userVerified, logout, getAllColleges, getAllAdmins, deleteUser, deleteCollege } from "../controllers/admin.js";



import {
    authMiddleware, authMiddlewareAdmin, superAdmin
} from "../middlewares/authMiddleware.js";


const router = express.Router()



router.post("/signup", authMiddlewareAdmin, superAdmin, adminSignup);
router.post("/signin", adminSignin);

router.get("/verify/admin/:userId/:uniqueString", verifyAdmin);

// router
//     .route("verified")
//     .get(userVerified);

router.post("/addCollege", authMiddlewareAdmin, superAdmin, addCollege);

router.get("/signout", logout);


router.get("/getAdmin/me", authMiddlewareAdmin, getAdmin)
router.get("/getAdmins/all", authMiddlewareAdmin, getAllAdmins)
router.get("/getColleges/all", getAllColleges);
router.delete("/deleteuser/:id", authMiddlewareAdmin, superAdmin, deleteUser)
router.delete("/deletecollege/:id", authMiddlewareAdmin, superAdmin, deleteCollege)


export default router;