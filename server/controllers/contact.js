const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

router.post("/submit", async (req, res) => {
  try {
    const randomEmailID = function(length = 10) {
      return Math.random().toString(36).substring(2, length + 2);
    }

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
        partialDir: path.resolve('./views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./views'),
      extName: ".handlebars",
    }

    transporter.use('compile', hbs(handlebarOptions));

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: req.body.emailAddress,
      subject: `MS-Dev Enquiry Reference: [${randomEmailID()}]`,
      template: 'contactConfirmEmail',
      context: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        message: req.body.message,
      }
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).send("Email was sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Sending Email");
  }
});

module.exports = router;
