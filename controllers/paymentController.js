/** @format */

const Razorpay = require("razorpay");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
// console.log(process.env.RAZORPAY_ID_KEY);

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY,
});

const createPayment = async (req, res) => {
  try {
    const amount = req.body.totalPrice * 100;
    const options = {
      amount: amount,
      currency: "INR",
      receipt: "razorUser@gmail.com",
    };

    razorpayInstance.orders.create(options, (err, order) => {
      if (!err) {
        res.json(200, {
          success: true,
          msg: "Order Created",
          orderId: order.id,
          amount: amount,
          keyId: process.env.RAZORPAY_ID_KEY,
          description: req.body.description,
          contact: "6393970007",
          name: "Alpha singh",
          email: "satyams@.com",
        });
      } else {
        return res.json(400, {
          message: "Sorry try again",
          success: false,
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createPayment,
};
