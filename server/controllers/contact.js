const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

router.post("/submit", async (req, res) => {
    try {
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

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: req.body.emailAddress,
            subject: `Enquiries Ref: [${req.body.firstName} ${req.body.lastName}] [Enquiry: ${Math.random()}]`,
            text: `${req.body.firstName} would like to know\n\n${req.body.message}`,
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
})