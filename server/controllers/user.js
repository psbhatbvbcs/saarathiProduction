import { User } from "../models/User.js";
import { UserVerification } from "../models/UserVerification.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/errorHandler.js";
import { config } from "dotenv";
import { sendVerificationEmail } from "../features/sendEmails.js";
import { sendCookie } from "../features/features.js";
import { CollegeSchema } from "../models/College.js";

config({
    path: "./data/config.env",
});

export const signup = async (req, res, next) => {
    try {
        let { name, email, password, dateOfBirth, collegeName } = req.body;
        name = name.trim();
        email = email.trim();
        password = password.trim();
        dateOfBirth = dateOfBirth.trim();

	    const kletechDomain = "@kletech.ac.in";

        if (name == "" || email == "" || password == "" || dateOfBirth == "") {
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

		if (!email.endsWith(kletechDomain)) {
                return next(new ErrorHandler("Please use your college email id to sign up", 404));
            }
            let user = await User.findOne({ email });

            if (user) {
                return next(new ErrorHandler("User with the provided email already exists", 404));
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            let college = await CollegeSchema.findOne({ _id: collegeName });

            if (!college) {
                return next(new ErrorHandler("College not found", 404));
            }

            user = await User.create({ name, email, password: hashedPassword, verified: false, dateOfBirth, college: college._id });

            
            res.status(201).json({
                success: true,
                message: "Registered Successfully! Please Log In" });
        }
    } catch (error) {
        next(error);
    }
};

export const verifyUser = async (req, res, next) => {
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
            await User.deleteOne({ _id: userId });

            let message = "Link has expired. Please sign up again.";
            return res.status(400).json({ success: false, message });
        }

        let comparedString = await bcrypt.compare(uniqueString, hashedUniqueString);
        if (comparedString) {
            await User.updateOne({ _id: userId }, { verified: true });
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

export const signin = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        if (email == "" || password == "") {
            return next(new ErrorHandler("Empty Credentials Supplied!", 404));
        }

        let user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("User doesn't exist. Please sign up.", 404));
        }

       
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return next(new ErrorHandler("Invalid Email or Password Entered", 404));
            }

            const userData = Object.assign({}, user.toObject());
            delete userData.password;

            sendCookie(userData, res, `Welcome back, ${userData.name}`, 201)

        
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

export const getUser = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 404))
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        let { semester, description, badges } = req.body;
        const file = req.file;
        const filePath = file?.filepath;
        const id = req.user._id;

        if (semester == "" && description == "" && badges == "" && file == undefined) {
            return next(new ErrorHandler("Empty Input Fields, Nothing Updated", 404));
        }

        let user = await User.findById(id);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        user.semester = semester;
        user.description = description;
        user.badges = badges;
        user.profilePicture = file ? filePath : user.profilePicture;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 404))
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const user = await User.findById(id).select("-password");
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        res.status(200).json({
            success: true,
            user,
            message: "User found successfully"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 404))
    }
}
