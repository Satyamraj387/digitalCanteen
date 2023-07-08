const {fetcher,insertOrder}= require("../controllers/orderController");
const { authJwt } = require("../middleware");


const express= require('express');

const router= express.Router();

router.get('/', [authJwt.verifyToken],fetcher);
router.post('/insert',[authJwt.verifyToken], insertOrder);

module.exports = router;
