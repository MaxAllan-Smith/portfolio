import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

async function main(emailAddress) {

    console.log(`Assigned Email Address: ${process.env.EMAIL_ADDRESS}`);

    let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Max Allan-Smith" <no-reply@ms-dev.co.uk>', // sender address
    to: emailAddress, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);

export default main;
