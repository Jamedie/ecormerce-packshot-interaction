const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");
const templates = require("./templates");

const gmailEmail = defineSecret("GMAIL_EMAIL");
const gmailPassword = defineSecret("GMAIL_PASSWORD");

// Deliberately simple: one "@", no spaces, a dot in the domain.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

// Sends a newsletter welcome email to the address the visitor subscribed with.
// The client only provides the address: subject and body are chosen here, so
// this endpoint cannot be used to send arbitrary content from our account.
exports.sendEmail = onRequest(
  {
    secrets: [gmailEmail, gmailPassword],
  },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Method not allowed" });
    }

    const body = req.body || {};
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email)) {
      return res.status(400).send({ message: "Invalid email address" });
    }

    const template = templates[Math.floor(Math.random() * templates.length)];

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailEmail.value(),
        pass: gmailPassword.value(),
      },
    });

    try {
      const info = await transporter.sendMail({
        from: gmailEmail.value(),
        to: email,
        subject: template.subject,
        text: template.message,
      });
      logger.info("Email sent:", info.response);
      return res.status(200).send({ message: "Email sent successfully!" });
    } catch (error) {
      logger.error("Error sending email:", error);
      return res.status(500).send({ message: "Could not send email" });
    }
  },
);
