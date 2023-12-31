const dotenv = require("dotenv").config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME,
  PERSISTENCE: process.env.PERSISTENCE || "FS",
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
  NODEMAILER_GMAIL: process.env.NODEMAILER_GMAIL,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  CALLBACK_URL: process.env.CALLBACK_URL,
  PASS_COOKIE: process.env.PASS_COOKIE,
  MODE: process.env.MODE || "production"
};

module.exports = config;
