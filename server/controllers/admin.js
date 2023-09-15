import { Admins } from "../models/Admin.js";
import { UserVerification } from "../models/UserVerification.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/errorHandler.js";
import { config } from "dotenv";
import { sendAdminVerificationEmail } from "../features/sendEmails.js";
import { sendCookie } from "../features/features.js";
import { CollegeSchema } from "../models/College.js";


config({
    path: "./data/config.env",
});


export const adminSignup = async (req, res, next) => {
    try {
        let { name, email, password, dateOfBirth, collegeName = "", role } = req.body;
        name = name.trim();
        email = email.trim();
        password = password.trim();
        dateOfBirth = dateOfBirth.trim();
        role = role.trim();

        if (name == "" || email == "" || password == "" || dateOfBirth == "" || role == "") {
            return next(new ErrorHandler("Empty Input Fields", 404));
        } else if (!/^[a-zA-Z ]*$/.test(name)) {
            return next(new ErrorHandler("Invalid Name Entered", 404));
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return next(new ErrorHandler("Invalid email entered", 404));
        } else if (!new Date(dateOfBirth).getTime()) {
            return next(new ErrorHandler("Invalid date of birth entered", 404));
        } else if (password.length < 8) {
            return next(new ErrorHandler("Password too short", 404));
        } else {
            let admin = await Admins.findOne({ email });

            if (admin) {
                return next(new ErrorHandler("Admin with the provided email already exists", 404));
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            let college = null;

            if (collegeName != "") {
                college = await CollegeSchema.findOne({ _id: collegeName });
                if (!college) {
                    return next(new ErrorHandler("College not found", 404));
                }
            }

            const collegeId = college ? college._id : null;

            admin = await Admins.create({ name, email, password: hashedPassword, verified: false, dateOfBirth, college: collegeId, role });



            sendAdminVerificationEmail(admin, res);
            res.status(201).json({
                success: true,
                message: "Registered Successfully! Please verify your email using the link sent to your inbox"
            });
        }
    } catch (error) {
        next(error);
    }
};




export const verifyAdmin = async (req, res, next) => {
    let { userId, uniqueString } = req.params;

    try {
        let result = await UserVerification.findOne({ userId });

        if (!result) {
            let message = "Account record doesn't exist or has already been verified. Please sign up or log in.";
            return res.status(400).json({ success: false, message });
        }

        const { expiresAt } = result;
        const hashedUniqueString = result.uniqueString;

        if (expiresAt < Date.now()) {
            await result.deleteOne();
            await Admins.deleteOne({ _id: userId });

            let message = "Link has expired. Please sign up again.";
            return res.status(400).json({ success: false, message });
        }

        let comparedString = await bcrypt.compare(uniqueString, hashedUniqueString);
        if (comparedString) {
            await Admins.updateOne({ _id: userId }, { verified: true });
            await result.deleteOne();

            let message = "Account verified successfully. Please log in.";
            return res.status(200).json({ success: true, message });
        } else {
            let message = "Invalid verification details passed. Check your inbox.";
            return res.status(400).json({ success: false, message });
        }
    } catch (error) {
        let message = "An error occurred while checking the existing user verification record";
        return res.status(400).json({ success: false, message });
    }
};

export const userVerified = async (req, res, next) => {
    return res.render("verified");
};

export const adminSignin = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        if (email == "" || password == "") {
            return next(new ErrorHandler("Empty Credentials Supplied!", 404));
        }

        let admin = await Admins.findOne({ email }).select("+password");

        if (!admin) {
            return next(new ErrorHandler("Invalid Email or Password Entered", 404));
        }

        if (!admin.verified) {
            return next(new ErrorHandler("Email hasn't been verified yet. Check your inbox", 404));
        } else {
            const isMatch = await bcrypt.compare(password, admin.password);

            if (!isMatch) {
                return next(new ErrorHandler("Invalid Email or Password Entered", 404));
            }

            const adminData = Object.assign({}, admin.toObject());
            delete adminData.password;

            sendCookie(adminData, res, "Welcome back", 201)

        }
    } catch (error) {
        next(error);
    }
};


export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true

    }).json({
        success: true,
        user: req.user
    })

}

export const getAdmin = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 404))
    }
}
 
export const getAllColleges = async (req, res, next) => {
    try {
        const colleges = await CollegeSchema.find();

        res.status(200).json({
            success: true,
            colleges,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 404))
    }
}

export const getAllAdmins = async (req, res, next) => {
    try {
        const admins = await Admins.find().select("-password");

        res.status(200).json({
            success: true,
            admins,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 404))
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Admins.deleteOne({ _id: id });
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteCollege = async (req, res, next) => {
    try {
        const { id } = req.params;
        await CollegeSchema.deleteOne({ _id: id });
        res.status(200).json({ success: true, message: "College deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}