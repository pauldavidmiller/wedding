require("dotenv").config();
const nodemailer = require("nodemailer");

// Create the transporter with Gmail and use environment variables
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

// Export the handler function that Netlify will use
exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const {
    fullName,
    dinnerChoice,
    plusOneFullName,
    plusOneDinnerChoice,
    dietaryRestrictions,
  } = body;

  const subject = "Wedding RSVP";
  const message = `${fullName} ${
    plusOneFullName ? `and ${plusOneFullName} are` : "is"
  } attending your wedding! 
  \n
  \n ${fullName}: ${dinnerChoice} 
  \n ${plusOneFullName}: ${plusOneDinnerChoice} 
  \n Dietary Restrictions: ${dietaryRestrictions}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: message,
  };

  try {
    // Send the email using nodemailer
    const info = await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, info }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error }),
    };
  }
};
