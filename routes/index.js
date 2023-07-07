const express= require('express');

const router= express.Router();
// const homeController= require('../controllers/home_controller.js');


router.use("/user", require("./user"));
router.use('/item', require("./item"));

// router.use('/users', require('./users')); 
// router.use('/menu', require('./posts'));
// router.use('/comments', require('./comments'));
// router.use('/likes', require('./likes'));
// router.use('/friendship', require('./friendship'));


// router.use('/api', require('./api/index'));
// console.log('routes');

module.exports= router;