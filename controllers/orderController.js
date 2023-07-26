/** @format */

const db = require("../config/db");
const { sendMail } = require("../config/nodeMailer");

module.exports.adminFetcher = async (req,res)=>{
    try {
      console.log("idhar bhi admin fetcher")
        const results = await db.query('SELECT * FROM orders');
        console.log(results.rows)

    return res.json(200, {
        message: 'Success',
        success: true,
        data: results.rows
    });
    } catch (error) {
        return res.json(400, {
            message:error
        })
    }

}
module.exports.fetcher = async (req, res) => {
  try {
    const results = await db.query(`select * from orders where email=$1`, [
      req.body.email,
    ]);
    console.log(results.rows);
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
    const mailer=await sendMail(order)
    if(mailer){
      return res.json(200, {
        message: "Order has been saved and mail delivered",
        success: true,
      });
    }else{
      return res.json(200, {
        message: "Order has been saved, mail can't be delivered",
        success: true,
      });
    }
    
  } catch (error) {
    console.log(error);
    return res.json(400, {
      message: "Sorry try again",
      error: error,
      success: false,
    });
  }
};
