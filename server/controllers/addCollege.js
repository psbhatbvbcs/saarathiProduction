import { CollegeSchema } from "../models/College.js";
import ErrorHandler from "../middlewares/errorHandler.js";

export const addCollege = async (req, res, next) => {
    try {

        const { collegeName, collegeAddress = "", collegeEmail = "", collegeWebsite = "" } = req.body;

        let collegeExists = await CollegeSchema.findOne({ collegeName: collegeName })

        if (collegeExists) {
            return next(new ErrorHandler("College already exists", 404))
        }

        collegeExists = await CollegeSchema.create({ collegeName, collegeAddress, collegeEmail, collegeWebsite })

        res.status(201).json({
            success: true,
            message: "College added successfully"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}