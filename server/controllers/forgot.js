import { User } from "../models/User.js"
import Randomstring from "randomstring";
import { sendResetEmail } from "../features/sendEmails.js";
import bcrypt from "bcrypt";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email });

    if (userData) {
      const randomString = Randomstring.generate();
      const currentDate = new Date();
      const expiresAt = new Date(currentDate.getTime() + 60 * 60 * 1000); // Expire link in 1 hour

      userData.token = {
        tokenId: randomString,
        expiresAt,
      };

      await userData.save();

      sendResetEmail(userData.name, userData.email, randomString);
      res.status(200).send({
        success: true,
        message: "Please check your inbox for mail and reset your password.",
      });
    } else {
      res
        .status(400)
        .send({ success: true, message: "The email does not exist." });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const userWithToken = await User.findOne({
      "token.tokenId": token,
    });

    if (!userWithToken) {
      res.status(400).send({ success: false, message: "User does not exist or invalid link. Try again" });
      return;
    }

    if (userWithToken.token.expiresAt < new Date()) {
      res.status(400).send({ success: false, message: "This link has expired" });
      return;
    }

    const newPassword = await bcrypt.hash(req.body.password, 10);

    userWithToken.password = newPassword;
    userWithToken.token = {}; // Clear the token data

    const userData = await userWithToken.save();

    res
      .status(200)
      .send({ success: true, message: "User password has been reset", data: userData });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
