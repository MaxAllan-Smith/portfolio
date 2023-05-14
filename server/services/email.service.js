const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

// SMTP SETUP
const transporter = nodemailer.createTransport(
  smtpTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
);

// HANDLEBARS CONFIG
const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".handlebars",
};
transporter.use("compile", hbs(handlebarOptions));

// EMAIL SENDER ENGINE
async function sendMail(mailOptions) {
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// [USER] ENQUIRY CONFIRMATION EMAIL
async function sendConfirmationEmail(email, userDetail) {
  const userMailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: userDetail.emailAddress,
    subject: `MS-Dev Enquiry Reference: [${email.emailReference}]`,
    template: "contactConfirmEmail",
    context: userDetail,
  };
  return await sendMail(userMailOptions);
}

// [OWNER] NEW ENQUIRY EMAIL
async function sendEnquiryNotificationEmail(email, userDetail) {
  const ownerMailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.EMAIL_ADDRESS,
    subject: `New Enquiry Ref: [${email.emailReference}]`,
    template: "contactEnquiryEmail",
    context: {
      ...userDetail,
      link: `${process.env.BASE_URL}/contact/respond/${email._id}`,
      currentDate: new Date().toLocaleDateString(),
      currentTime: new Date().toLocaleTimeString(),
    },
  };
  return await sendMail(ownerMailOptions);
}

// [USER] RESPONSE EMAIL
async function sendResponseEmail(responseEmailDetail) {
  const { firstName, lastName, emailReference, responseMessage } = responseEmailDetail;

  console.log(responseMessage);

  const responseMailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: responseEmailDetail.emailAddress,
    subject: `Response to Enquiry Ref: [${emailReference}]`,
    template: "contactResponseEmail",
    context: { firstName, lastName, emailReference, responseMessage },
  };
  return await sendMail(responseMailOptions);
}

// [USER] EXISTING EMAIL
async function sendExistingEmail(emailDetail) {
  const existingMailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: emailDetail.emailAddress,
    subject: `Existing Enquiry Ref: [${emailDetail.emailReference}]`,
    template: "contactExistingEmail",
    context: {
      emailDetail,
    },
  };
  return await sendMail(existingMailOptions);
}

module.exports = {
  sendConfirmationEmail,
  sendExistingEmail,
  sendEnquiryNotificationEmail,
  sendResponseEmail,
};
