const nodemailer = require("nodemailer");

const sendMail=async (data)=>{
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "satgun041@gmail.com",
      pass: "jlqsukidbnrtsumf",
    },
  });
  
  let mailDetails = {
    from: "satgun041@gmail.com",
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
      console.log("Error Occurs",err);
    } else {
      console.log("Email sent successfully");
    }
  });
}
module.exports = {
  sendMail,
};
