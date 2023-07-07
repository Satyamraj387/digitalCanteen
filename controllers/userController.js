const db= require("../config/db");





module.exports.fetcher = async (req,res)=>{
    try {
        console.log("trying in userController")
        const results = await db.query('SELECT * FROM users1');
 
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

module.exports.insertUser = async (req, res) => {
    // try {
    //     console.log("insert item called")
        
    //     await client.query(
    //         `INSERT INTO "users1" ("email", "name", "password", "orders")  
    //          VALUES ($1, $2,$3, $4)`, [email, userName, password, orders]); // sends queries
    //     return true;
    // } catch (error) {
    //     console.error(error.stack);
    //     return false;
    // } 

    try {
        console.log(req.body);
        
 
        //   await client.connect()// gets connection
        await db.query(
            `INSERT INTO "users1" ("email","name","password","orders")  
             VALUES ($1, $2,$3, $4)`, [req.body.email, req.body.name, req.body.password, req.body.orders]); // sends queries
             return res.json(200, {
                 message: 'Success',
             });
    } catch (error) {
     return res.json(400, {
         message: "Sorry try again",
         error: error
     });
    }
};