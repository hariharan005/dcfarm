const express = require("express");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Name, email, and message are required" });
  }

  try {
    const recipient = process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER;
    await sendEmail(
      recipient,
      `Contact form message from ${name}`,
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      email
    );

    return res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact email failed:", error);
    return res.status(500).json({ success: false, message: "Unable to send message" });
  }
});

module.exports = router;
