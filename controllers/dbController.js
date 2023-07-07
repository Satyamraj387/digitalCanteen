//  const client= require("../config/db");




//  module.exports.insertItem =async (itemId, itemName, desc, price, avail) => {
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




// module.exports.insertUser = async (email, userName, password, orders) => {
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


// module.exports.fetchUser = async ()=>{
//     const results = await db.query('SELECT * FROM users1');
//     return results;
// }









