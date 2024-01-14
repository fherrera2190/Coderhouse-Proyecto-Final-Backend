const nodemailer = require("nodemailer");

const config = require("../config/config");


const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.NODEMAILER_GMAIL,
    pass: config.NODEMAILER_PASS
  }
});

module.exports = transport;
