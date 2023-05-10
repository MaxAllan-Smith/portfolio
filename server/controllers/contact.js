const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const Email = require("../models/email.js");

router.post("/submit", async (req, res) => {
  try {
    // RANDOM ID GENERATOR
    const randomEmailID = function (length = 10) {
      return Math.random()
        .toString(36)
        .substring(2, length + 2);
    };

    // STORES A REFERENCE OF THE EMAIL THREAD TO THE DATABASE
    const email = new Email({
      emailReference: randomEmailID(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      message: req.body.message,
    });

    if (await email.save()) {
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

      // HTML EMAIL TEMPLATES BASE PATH
      const handlebarOptions = {
        viewEngine: {
          extName: ".handlebars",
          partialDir: path.resolve("./views"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./views"),
        extName: ".handlebars",
      };

      // COMPILES THE HTML VIEWS FOR EMAILS
      transporter.use("compile", hbs(handlebarOptions));

      // CONSTRUCTS THE EMAIL FOR THE USER
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

      // CONSTRUCTS THE EMAIL FOR THE OWNER
      const ownerMailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_ADDRESS,
        subject: email.emailReference,
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

      // SENDS THE CONFIRMATION EMAIL TO THE USER
      transporter.sendMail(userMailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      // SEND THE ENQUIRY TO THE OWNER
      transporter.sendMail(ownerMailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      // SENDS A RESPONSE BACK TO THE FRONTEND
      res.status(201).send("Email was sent successfully");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Sending Email");
  }
});

module.exports = router;
