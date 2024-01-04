const { adminFetcher}= require("../controllers/orderController");
const {fetcher,insertItem, updateItem, deleteItem}= require("../controllers/itemController");

const { authJwt } = require("../middleware");

const express= require('express');

const router= express.Router();




router.get('/',[authJwt.verifyToken], fetcher);
router.post('/insert',[authJwt.verifyToken],insertItem);
router.post('/update',[authJwt.verifyToken],updateItem);
router.post('/delete',[authJwt.verifyToken],deleteItem);
router.get('/orders',[authJwt.verifyToken],adminFetcher);




module.exports = router;