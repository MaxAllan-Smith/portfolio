require("dotenv").config();
const express = require("express");
const router = express.Router();
const Email = require("../models/email.js");
const {
  sendConfirmationEmail,
  sendExistingEmail,
  sendEnquiryNotificationEmail,
  sendResponseEmail,
} = require("../services/email.service.js");
const {
  isWithin3Days,
  getRemainingDays,
  generateRandomEmailID,
} = require("../utils/helperFunctions");

router.get("/respond/:userId", async (req, res) => {
  try {
    const user = await Email.findById(req.params.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Extract the required details from the user object
    const { firstName, lastName, emailAddress, message } = user;

    // Prepare the response object with the extracted details
    const userDetails = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      enquiry: message,
    };

    res.send(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});


router.post("/respond/submit", async (req, res) => {
  try {
    const { userId, responseMessage } = req.body;

    const email = await Email.findById(userId);

    if (!email) {
      return res.status(404).send("Email not found");
    }

    // Store the response details in the 'initialResponse' field array
    email.initialResponse.push({
      responseMessage: responseMessage,
      respondedAt: new Date(),
    });

    // Save the email with the updated response details
    await email.save();

    // Send an email to the user containing the response details
    const result = await sendResponseEmail({
      firstName: email.firstName,
      lastName: email.lastName,
      emailAddress: email.emailAddress,
      emailReference: email.emailReference,
      responseMessage: responseMessage,
    });

    console.log(result.responseMessage);

    if (result) {
      email.responded = true;
      await email.save();
      return res.status(200).send("Response email sent successfully");
    } else {
      return res.status(500).send("Failed to send response email");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/submit", async (req, res) => {
  try {
    // DEFINE OBJECT FIELDS FROM REQUEST BODY
    const { firstName, lastName, emailAddress, message } = req.body;

    // CHECK IF AN EMAIL WITH THE SAME ADDRESS EXISTS AND HAS NOT BEEN RESPONDED WITHIN 3 DAYS
    const existingEmail = await Email.findOne({ emailAddress });

    if (
      existingEmail &&
      !existingEmail.responded &&
      isWithin3Days(existingEmail.createdAt)
    ) {
      const remainingDays = getRemainingDays(existingEmail.createdAt);
      return res.status(400).json({
        error: `You have already made a request. Please wait ${remainingDays} more days for a response.`,
      });
    }

    // IF EXISTING EMAIL EXISTS
    if (existingEmail) {
      // CHECK IF THE EMAIL HAS BEEN RESPONDED AND WITHIN 3 DAYS
      if (existingEmail.responded && isWithin3Days(existingEmail.createdAt)) {
        // SEND AN EMAIL TO THE USER ABOUT THE PREVIOUS RESPONSE
        try {
          const existingEmailDetail = {
            firstName: existingEmail.firstName,
            lastName: existingEmail.lastName,
            emailAddress: existingEmail.emailAddress,
            message: existingEmail.message,
            emailReference: existingEmail.emailReference,
            createdAt: existingEmail.createdAt,
            responseMessage: existingEmail.initialResponse[0].responseMessage,
            respondedAt: existingEmail.initialResponse[0].respondedAt,
          };

          console.log(existingEmail.initialResponse[0].responseMessage)

          await sendExistingEmail(existingEmailDetail);

          return res
            .status(200)
            .send(
              "We have already responded to your previous enquiry. Please check your email."
            );
        } catch (error) {
          console.error(error);
          return res.status(500).send("Failed to send email");
        }
      } else {
        // UPDATE THE EXISTING EMAIL WITH THE USER'S MESSAGE
        existingEmail.message = message;
        await existingEmail.save();
        return res.status(200).send("Email was sent successfully");
      }
    } else {
      // CREATE A NEW EMAIL INSTANCE AND SAVE IT TO THE DATABASE
      const email = new Email({
        emailReference: generateRandomEmailID(),
        firstName,
        lastName,
        emailAddress,
        message: message,
      });

      if (await email.save()) {
        const userDetail = { firstName, lastName, emailAddress, message };
        try {
          await sendConfirmationEmail(email, userDetail);
          await sendEnquiryNotificationEmail(email, userDetail);
          return res.status(201).send("Email was sent successfully");
        } catch (error) {
          console.error(error);
          return res.status(500).send("Failed to send email");
        }
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
});

module.exports = router;
