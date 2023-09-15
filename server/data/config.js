import { config } from "dotenv";

config();

export const credential = {
  user: "admsaarathi@gmail.com",
  clientId: process.env.GMAIL_CLIENTID,
  clientSecret: process.env.GMAIL_CLIENTSECRET,
  refreshToken: process.env.GMAIL_REFRESHTOKEN,
};
