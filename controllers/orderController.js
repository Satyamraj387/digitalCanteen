/** @format */

const db = require("../config/db");
const { sendMail } = require("../config/nodeMailer");

// module.exports.adminFetcher = async (req,res)=>{
//     try {
//         const results = await db.query('SELECT * FROM orders');

//     return res.json(200, {
//         message: 'Success',
//         results: results
//     });
//     } catch (error) {
//         return res.json(400, {
//             message:error
//         })
//     }

// }
module.exports.fetcher = async (req, res) => {
  try {
    const results = await db.query(`select * from orders where email=$1`, [
      req.body.email,
    ]);
    // console.log(results);
    return res.json(200, {
      message: "your all orders are here",
      data: results.rows,
      success: true,
    });
  } catch (error) {
    return res.json(400, {
      message: "error in fetching",
      error: error,
      success: false,
    });
  }
};


module.exports.insertOrder = async (req, res) => {
  try {
    var cartItems = req.body.cartItems;
    var prices = [],
      items = {};
    cartItems.forEach((e) => {
      prices.push(e.price);
      items[e.name] = e.quantity;
    });

    let id = Date.now();
    prices = JSON.stringify(prices);
    totalPrice=Number(req.body.totalPrice);
    email= req.body.email;

    await db.query(
      `INSERT INTO "orders" ("id","items","prices","totalprice", "email")  
               VALUES ($1, $2,$3, $4, $5)`,
      [id, items, prices, totalPrice,email]
    ); 
    var userDetails = await db.query(`select * from users1 where email=$1`, [
      email,
    ]);
    userDetails=userDetails.rows[0]
    console.log(userDetails)
    order={id, items, prices, totalPrice, userDetails}
    await sendMail(order)
    return res.json(200, {
      message: "Order has been saved",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json(400, {
      message: "Sorry try again",
      error: error,
      success: false,
    });
  }
};
