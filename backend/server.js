require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/notify", (req, res) => {
  const { fullName, plusOneFullName } = req.body;

  const subject = "New Wedding RSVP";
  const message = `${fullName} ${
    plusOneFullName ? `and ${plusOneFullName} are` : "is"
  } attending your wedding!`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ success: false, error });
    }
    res.send({ success: true, info });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
