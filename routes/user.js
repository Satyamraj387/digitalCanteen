const {fetcher,insertUser,validateUser}= require("../controllers/userController");


const express= require('express');

const router= express.Router();


router.get('/', fetcher);
router.post('/signup',insertUser);
router.post('/login', validateUser)

module.exports = router;

