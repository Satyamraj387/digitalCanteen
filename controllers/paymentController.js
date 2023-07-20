/** @format */

const Razorpay = require("razorpay");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_U9mpcxwvAidgxM",
  key_secret: "ADIeMeoX7oRXL2mmvpGRdtQQ",
});

const createPayment = async (req, res) => {
  try {
    const amount = req.body.totalPrice * 100;
    const options = {
      amount: amount,
      currency: "INR",
      receipt: "razorUser@gmail.com",
    };
    // console.log('aaya hun')

    razorpayInstance.orders.create(options, (err, order) => {
      if (!err) {
        res.json(200, {
          success: true,
          msg: "Order Created",
          orderId: order.id,
          amount: amount,
          keyId: 'rzp_test_U9mpcxwvAidgxM',
          description: req.body.description,
          contact: "6393970007",
          name: "Alpha singh",
          email: "sandeep@gmail.com",
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
