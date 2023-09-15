import nodemailer from "nodemailer"
import { google } from "googleapis"
import { credential } from "./data/config.js"
import { mongoose } from "mongoose"
import { UserVerification } from "./models/UserVerification.js";

import { v4 as uuidv4 } from 'uuid';

import path from "path";
import bcrypt from "bcrypt";

const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(credential.clientId, credential.clientSecret)

OAuth2_client.setCredentials( { refresh_token: credential.refreshToken })

const accessToken = OAuth2_client.getAccessToken();

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: credential.user,
        clientId: credential.clientId,
        clientSecret: credential.clientSecret,
        refreshToken: credential.refreshToken,
        accessToken: accessToken
    }
})

export const sendVerificationEmail = async ({ _id, email }, res) => {
    try {
        const currentUrl = `'http://localhost:5000/'`;
        const uniqueString = uuidv4() + _id;
        const mailOptions = {
            from: credential.user,
            to: email,
            subject: 'Verify Your Email',
            html: `<p>Verify your email address to complete the signup and login to your account.</p>
             <p>This link <b>expires in 6 hours</b>.</p>
             <p>Press <a href=${currentUrl + 'api/v01/users/verify/' + _id + '/' + uniqueString}>here</a> to verify.</p>`,
        };

        const saltRounds = 10;
        const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);

        const newVerification = await UserVerification.create({
            userId: _id,
            uniqueString: hashedUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000,
        });

        await transport.sendMail(mailOptions);
    } catch (error) {
    }
}
