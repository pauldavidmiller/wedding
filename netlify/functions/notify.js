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
  const { rsvps, confirmationEmailAddress, otherComments } = body; // Rsvps is of type Rsvp (object);

  const subject = "Margot & Paul's Wedding RSVP";

  let anyInvitedRehearsal = false;
  for (let i = 0; i < rsvps.length; i++) {
    const rsvp = rsvps[i];
    if (rsvp.attendingRehearsal != null) {
      anyInvitedRehearsal = true;
      break;
    }
  }

  let anyAttending = false;
  for (let i = 0; i < rsvps.length; i++) {
    const rsvp = rsvps[i];
    if (
      rsvp.dinnerChoice != null &&
      rsvp.attendingChoice?.toString() === "Yes"
    ) {
      anyAttending = true;
      break;
    }
  }

  let anyDietaryRestrictions = false;
  for (let i = 0; i < rsvps.length; i++) {
    const rsvp = rsvps[i];
    if (
      rsvp.dietaryRestrictions != null &&
      rsvp.dietaryRestrictions.trim() !== ""
    ) {
      anyDietaryRestrictions = true;
      break;
    }
  }

  const rsvpEntries = rsvps
    .map(
      (rsvp) =>
        `
        <tr>
            <td>${rsvp.name}</td>` +
        (anyInvitedRehearsal
          ? `<td>${rsvp.attendingRehearsal.toString() || "--"}</td>`
          : "") +
        `<td>${rsvp.attendingChoice?.toString() || "--"}</td>` +
        (anyAttending
          ? `<td>${rsvp.dinnerChoice?.toString() || "--"}</td>`
          : "") +
        (anyAttending && anyDietaryRestrictions
          ? `<td>${rsvp.dietaryRestrictions?.toString() || "--"}</td>`
          : "") +
        `</tr>
    `
    )
    .join("");

  const rsvpBody =
    `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: 'Georgia', serif;
                background-color: #f8f8f8;
                padding: 20px;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
                text-align: center;
                color: #A45D5D;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #A45D5D;
                color: white;
            }
            .custom-message {
                margin-top: 20px;
                padding: 0 15px;
                background-color: #f2f2f2;
                border-radius: 6px;
                color: #333;
                white-space: pre-wrap;
            }
            .custom-message strong {
                display: block;
                margin-left: 0;
            }
            .footer {
                text-align: center;
                font-size: 14px;
                margin-top: 20px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Wedding RSVP Confirmation</h2>
            <p>` +
    (anyAttending
      ? "We’re thrilled to have you celebrating with us!"
      : "We're sorry you won't be able to join!") +
    ` Below are the RSVP details provided:</p>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>` +
    (anyInvitedRehearsal ? `<th>Attending Rehearsal</th>` : "") +
    `<th>Attending Wedding</th>` +
    (anyAttending ? `<th>Dinner Choice</th>` : "") +
    (anyAttending && anyDietaryRestrictions
      ? `<th>Dietary Restrictions</th>`
      : "") +
    `</tr>
                </thead>
                <tbody>
                    ${rsvpEntries}
                </tbody>
            </table>
            <div class="custom-message">
                <strong>Custom Message:</strong><br>${otherComments}
            </div>
            <div class="footer">
                With love,<br>
                Margot & Paul
            </div>
        </div>
    </body>
    </html>
  `;

  // Send to ourselves
  const toUsMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: subject,
    html: rsvpBody,
  };

  // Send to confirmation email
  const toYouMailOptions = {
    from: process.env.EMAIL_USER,
    to: confirmationEmailAddress,
    subject: subject,
    html: rsvpBody,
  };

  try {
    // Send the emails using nodemailer
    let mailOptions = [transporter.sendMail(toUsMailOptions)];

    if (
      confirmationEmailAddress != null &&
      confirmationEmailAddress.trim() !== ""
    ) {
      mailOptions.push(transporter.sendMail(toYouMailOptions));
    }

    // Call all emails in parallel
    const info = await Promise.allSettled(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, info }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error }),
    };
  }
};
