const db= require("../config/db");




module.exports.fetcher = async (req,res)=>{
    try {
        const results = await db.query('SELECT * FROM orders');
 
    return res.json(200, {
        message: 'Success',
        results: results
    });
    } catch (error) {
        return res.json(400, {
            message:error
        })
    }
    
}




module.exports.insertOrder = async (req, res) => {


    try {
        console.log(req.body);
        let id = new Date().getTime();
        console.log(id)
        await db.query(
            `INSERT INTO "orders" ("id","items","prices","totalprice")  
             VALUES ($1, $2,$3, $4)`, [ id,req.body.items, req.body.prices, req.body.totalprice,req.body.id]); // sends queries
             return res.json(200, {
                 message: 'Success',
             });
    } catch (error) {
     return res.json(400, {
         message: "Sorry try again",
         error: error
     });
    }}