const express= require('express');


const router= express.Router();


router.use("/user", require("./user"));
router.use('/items', require("./item"));
router.use('/orders',require("./order"));

module.exports= router;