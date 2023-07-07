const {fetcher,insertUser}= require("../controllers/userController");


const express= require('express');

const router= express.Router();


router.get('/', fetcher);
router.post('/signup',insertUser);

module.exports = router;

