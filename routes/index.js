const express= require('express');

const router= express.Router();


router.use("/user", require("./user"));
router.use('/items', require("./item"));
router.use('/order',require("./order"));

// router.use('/users', require('./users')); 
// router.use('/menu', require('./posts'));
// router.use('/comments', require('./comments'));
// router.use('/likes', require('./likes'));
// router.use('/friendship', require('./friendship'));

module.exports= router;