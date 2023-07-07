const db= require("../config/db");





module.exports.fetcher = async (req,res)=>{
    try {
        // console.log("trying in userController")
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


    try {
        console.log(req.body);
        
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


module.exports.validateUser = async(req,res)=>{
    try {
         console.log(req.body)
        const results = await db.query(`select password from users1 where email=$1`,[req.body.email]);
        console.log(results.rows[0].password)
        if(results.rows[0].password===req.body.password){
            return res.json(200, {
                message: 'Success',
            });
        }else{
            return res.json(401,{
                message: 'Please fill valid credentials'
            })
        }
 
    
    } catch (error) {
        return res.json(400, {
            message:error
        })
    }
}