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
  const { rsvps, confirmationEmailAddress } = body; // Rsvps is of type Rsvp (object);

  const subject = "Margot & Paul's Wedding RSVP";
  let message = "";

  for (let i = 0; i < rsvps.length; i++) {
    const rsvp = rsvps[i];

    message += "Name: " + rsvp.name + "\n";
    message += "Dinner: " + rsvp.dinnerChoice?.toString() + "\n";
    if (!!rsvp.dietaryRestrictions) {
      message += "Dietary Restrictions: " + rsvp.dietaryRestrictions + "\n";
    }
    message += "\n";
  }

  const toUsMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: message,
  };

  const toYouMailOptions = {
    from: process.env.EMAIL_USER,
    to: confirmationEmailAddress,
    subject: subject,
    text: message,
  };

  try {
    // Send the email using nodemailer
    const [infoUs, infoYou] = await Promise.allSettled([
      transporter.sendMail(toUsMailOptions),
      transporter.sendMail(toYouMailOptions),
    ]);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, infoUs, infoYou }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error }),
    };
  }
};
