const {fetcher,insertItem}= require("../controllers/itemController");


const express= require('express');

const router= express.Router();

router.get('/', fetcher);
router.post('/insert',insertItem);

module.exports = router;
