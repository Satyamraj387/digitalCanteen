const {fetcher,insertItem}= require("../controllers/itemController");


const express= require('express');

const router= express.Router();

router.get('/', fetcher);
router.post('/insert',insertItem);

module.exports = router;

// insertItem('8', 'Satyam','aa', '10', '1' ).then(result => {
//     if (result) {
//         console.log('item inserted');
//     }
// });