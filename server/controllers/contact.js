require("dotenv").config();

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const Email = require("../models/email.js");

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

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialDir: path.resolve("./views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));

router.post("/submit", async (req, res) => {
  try {
    const existingEmail = await Email.findOne({
      emailAddress: req.body.emailAddress,
    });

    if (existingEmail) {
      const now = new Date();
      const createdAt = new Date(existingEmail.createdAt);
      const difference = now - createdAt;
      const days = difference / (1000 * 60 * 60 * 24);

      if (days < 3) {
        return res
          .status(500)
          .send(
            `You cannot send another request for another ${Math.ceil(
              3 - days
            )} days\nPlease wait, I will get back to you soon.\n`
          );
      }
    }

    const randomEmailID = function (length = 10) {
      return Math.random()
        .toString(36)
        .substring(2, length + 2);
    };

    const email = new Email({
      emailReference: randomEmailID(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      message: req.body.message,
    });

    if (await email.save()) {
      const userMailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: req.body.emailAddress,
        subject: `MS-Dev Enquiry Reference: [${email.emailReference}]`,
        template: "contactConfirmEmail",
        context: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          emailAddress: req.body.emailAddress,
          message: req.body.message,
        },
      };

      const ownerMailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_ADDRESS,
        subject: `New Enquiry Ref: [${email.emailReference}]`,
        template: "contactEnquiryEmail",
        context: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          emailAddress: req.body.emailAddress,
          message: req.body.message,
          currentDate: new Date().toLocaleDateString(),
          currentTime: new Date().toLocaleTimeString(),
        },
      };

      transporter.sendMail(userMailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      transporter.sendMail(ownerMailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      return res.status(201).send("Email was sent successfully");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
