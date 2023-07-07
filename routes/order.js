const {fetcher,insertOrder}= require("../controllers/orderController");


const express= require('express');

const router= express.Router();

router.get('/', fetcher);
router.post('/insert',insertOrder);

module.exports = router;
