const { MailtrapClient } = require("mailtrap");
const nodemailer = require("nodemailer");
const ErrorHandler = require("./errorhandler");

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: "<b>Hi</b>",
    });
  } catch (e) {
    return new ErrorHandler(e.stack, 404);
  }
};

module.exports = sendEmail;
