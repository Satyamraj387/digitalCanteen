var pg = require('pg');
var client = new pg.Client("postgres://khqaykpj:bAxWoVHb0fyS3D07pM1tXYRI_n4ChC3S@john.db.elephantsql.com/khqaykpj");




//     insertItem =async (itemId, itemName, desc, price, avail) => {
//     try {
//         console.log('iiii')
//         //   await client.connect()// gets connection
//         await client.query(
//             `INSERT INTO "items" ("id", "name", "description", "price", "availability")  
//              VALUES ($1, $2,$3, $4, $5)`, [itemId, itemName, desc, price, avail]); // sends queries
//         return true;
//     } catch (error) {
//         console.error(error.stack);
//         return false;
//     }
// }




// insertUser = async (email, userName, password, orders) => {
//     try {
//         console.log("insert item called")
        
//         await client.query(
//             `INSERT INTO "users1" ("email", "name", "password", "orders")  
//              VALUES ($1, $2,$3, $4)`, [email, userName, password, orders]); // sends queries
//         return true;
//     } catch (error) {
//         console.error(error.stack);
//         return false;
//     } 
// };


// insertItem('7', 'Satyam','aa', '10', '1' ).then(result => {
//     if (result) {
//         console.log('User inserted');
//     }
// });
// insertUser('g@a.com', 'satyam','121', '{ "customer": "Alex Cross"}', ).then(result => {
//         if (result) {
//             console.log('User inserted');
//         }
//     });

module.exports = client;