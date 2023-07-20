const {fetcher,insertOrder}= require("../controllers/orderController");
const { createPayment } = require("../controllers/paymentController");
const { authJwt } = require("../middleware");


const express= require('express');

const router= express.Router();

router.post('/payment',[authJwt.verifyToken], createPayment);

router.post('/insert',[authJwt.verifyToken], insertOrder);
router.get('/', [authJwt.verifyToken],fetcher);



module.exports = router;
