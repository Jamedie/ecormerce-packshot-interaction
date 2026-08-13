const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");

const gmailEmail = defineSecret("GMAIL_EMAIL");
const gmailPassword = defineSecret("GMAIL_PASSWORD");

exports.sendEmail = onRequest(
  {
    secrets: [gmailEmail, gmailPassword],
  },
  async (req, res) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailEmail.value(),
        pass: gmailPassword.value(),
      },
    });
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Method not allowed" });
    }

    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const mailOptions = {
      from: gmailEmail.value(),
      to,
      subject,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send({ error: error.toString() });
      }

      console.log("Email sent:", info.response);
      return res.status(200).send({ message: "Email sent successfully!" });
    });
  });
