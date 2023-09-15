import express from "express"
import { forgotPassword, resetPassword } from "../controllers/forgot.js"

const routers = express.Router();

routers.post('/forgot-password', forgotPassword);
routers.post('/reset-password/:token', resetPassword);

export default routers;