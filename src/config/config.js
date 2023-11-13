const dotenv = require("dotenv").config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME,
  PERSISTENCE: process.env.PERSISTENCE || "FS",
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
  NODEMAILER_GMAIL: process.env.NODEMAILER_GMAIL
};

module.exports = config;
