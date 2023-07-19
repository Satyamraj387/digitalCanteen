const db= require("../config/db");




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
module.exports.fetcher = async (req,res)=>{
    try {
        
        const results = await db.query(`select * from orders where email=$1`,[req.body.email]);
        console.log(results);
    return res.json(200, {
        message: 'your all orders are here',
        data: results.rows,
        success:true

    });
    } catch (error) {
        return res.json(400, {
            message:"error in fetching",
            error: error,
            success:false

        })
    }
    
}




module.exports.insertOrder = async (req, res) => {


    try {
        console.log(req.body);
        let id = Date.now();
        console.log(id)
        await db.query(
            `INSERT INTO "orders" ("id","items","prices","totalprice", "email")  
             VALUES ($1, $2,$3, $4, $5)`, [ id,req.body.items, req.body.prices, req.body.totalprice, req.body.email]); // sends queries
             return res.json(200, {
                 message: 'Success',
                 success:true

             });
    } catch (error) {
     return res.json(400, {
         message: "Sorry try again",
         error: error,
         success:false

     });
    }}