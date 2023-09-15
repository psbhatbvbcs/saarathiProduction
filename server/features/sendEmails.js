import nodemailer from "nodemailer"
import { google } from "googleapis"
import { mongoose } from "mongoose"
import { UserVerification } from "../models/UserVerification.js";
import { credential } from "../data/config.js";
import inlineBase64 from "nodemailer-plugin-inline-base64"

import { v4 as uuidv4 } from 'uuid';

import path from "path";
import bcrypt from "bcrypt";
import { adminMailOptions, userMailOptions } from "./mailOptionsHtmlTemplates.js";

const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(credential.clientId, credential.clientSecret)

OAuth2_client.setCredentials({ refresh_token: credential.refreshToken })

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
        const currentUrl = `${process.env.FRONTEND_URL}/`;
        const uniqueString = uuidv4() + _id;
        const mailingTemplate = userMailOptions(currentUrl, _id, uniqueString)
        const mailOptions = {
            from: credential.user,
            to: email,
            subject: 'Verify Your Email',
            html: mailingTemplate,
        };

        const saltRounds = 10;
        const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);

        const newVerification = await UserVerification.create({
            userId: _id,
            uniqueString: hashedUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000,
        });
        transport.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));
        await transport.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}

export const sendAdminVerificationEmail = async ({ _id, email }, res) => {
    try {
        const currentUrl = `${process.env.FRONTEND_URL}/`;
        const uniqueString = uuidv4() + _id;
        const mailingTemplate = adminMailOptions(currentUrl, _id, uniqueString)
        const mailOptions = {
            from: credential.user,
            to: email,
            subject: 'Verify Your Email',
            html: mailingTemplate,
        };

        const saltRounds = 10;
        const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);

        const newVerification = await UserVerification.create({
            userId: _id,
            uniqueString: hashedUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000,
        });
        transport.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));
        await transport.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}

export const sendResetEmail = async (name, email, token) => {
    try {
        const currentUrl = `${process.env.FRONTEND_URL}/`;
        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject: 'For reset password',
            html: `<p> Hi ${name}, Please go to the link <a href=${currentUrl + 'reset-password/' + token}> to reset your password</a>`
            //text:text,
        };

        await transport.sendMail(mailOptions);

        console.log("Email sent successfully");
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}  