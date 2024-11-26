const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Lire les secrets depuis les variables d'environnement
const gmailEmail = process.env.GMAIL_EMAIL;
const gmailPassword = process.env.GMAIL_PASSWORD;

// Configurer le transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Method not allowed" });
  }

  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  const mailOptions = {
    from: gmailEmail,
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
