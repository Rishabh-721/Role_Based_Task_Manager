const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { verifyHtml, resetPwdHtml } = require("./html/emailHtml");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BOT_EMAIL_ID,
    pass: process.env.BOT_EMAILAPP_PASSWORD,
  },
});



const verifyUserMail = async(email, token) => await transporter.sendMail({
    from: `${process.env.BOT_EMAIL_ID}`,
    to: `${email}`,
    subject: `Verify Email Id ${email}`,
    html: verifyHtml(token)
})

const resetPassword = async(email, token) => await transporter.sendMail({
    from: `${process.env.BOT_EMAIL_ID}`,
    to: `${email}`,
    subject: `Password reset Request ${email}`,
    html: resetPwdHtml(token)
})

module.exports = {verifyUserMail, resetPassword};