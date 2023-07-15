const db= require("../config/db");


module.exports.fetcher = async (req,res)=>{
    try {
        const results = await db.query('SELECT * FROM items');
 
    return res.json(200, {
        message: 'Success',
        data: results,
        success:true

    });
    } catch (error) {
        return res.json(400, {
            message:error,
            success:false

        })
    }
    
}

module.exports.insertItem =async (req,res) => {
   try {
       console.log(req.body);
       

       await db.query(
           `INSERT INTO "items" ("id", "name", "description", "price", "availability")  
            VALUES ($1, $2,$3, $4, $5)`, [req.body.id, req.body.name, req.body.desc, req.body.price, req.body.avail]); // sends queries
            return res.json(200, {
                message: 'Successfully inserted item in menu',
                success:true

            });
   } catch (error) {
    return res.json(400, {
        message: "Sorry try again",
        error: error,
        success:false

    });
   }
}