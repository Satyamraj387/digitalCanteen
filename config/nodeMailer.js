/** @format */

const nodemailer = require("nodemailer");

const sendMail = async (data) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_ID,
      pass: process.env.MAILER_PASS,
    },
  });

  let mailDetails = {
    from: "Argus Canteen",
    to: data.userDetails.email,
    subject: "your order details",
    text: `Hi ${data.userDetails.name},
    You order of Rs ${data.totalPrice} has been successful.
    You can view your full order details by visiting our website.
    Kindly take your order from the canteen reception.
    Thankyou for ordering with DigitalCanteen`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
      return false;
    } else {
      return true;
      // console.log("Email sent successfully");
    }
  });
};


const sendOtp=async (email,otp)=>{  // Generate a random 6-digit OTP
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_ID,
      pass: process.env.MAILER_PASS,
    },
  });
  // const otp = Math.floor(100000 + Math.random() * 900000);
  // generatedOtps[email] = otp;
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email, // The email address where you want to send the OTP
    subject: 'OTP for Registration',
    text: `Your OTP for registration is: ${otp}`,
  };
  mailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending OTP:', error);
      res.status(500).json({ message: 'Failed to send OTP' });
    } else {
      console.log('OTP sent:', info.response);
      res.status(200).json({ message: 'OTP sent successfully' });
    }
  });
};
module.exports = {
  sendMail,
  sendOtp,
  // generatedOtps,
};