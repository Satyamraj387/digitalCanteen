const db= require("../config/db");
const config= require("../config/auth")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");





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
        var password= bcrypt.hashSync(req.body.password, 8);
        await db.query(
            `INSERT INTO "users1" ("email","name","password","orders")  
             VALUES ($1, $2,$3, $4)`, [req.body.email, req.body.name, password, req.body.orders]); // sends queries
             return res.json(200, {
                 message: 'Successfully signed up. Please login',
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
        const results = await db.query(`select * from users1 where email=$1`,[req.body.email]);
        var user=results.rows[0];
        console.log(user)
        // var userId = results.rows[0].id;
        // return res.json(200, user.password);
        var passwordIsValid = bcrypt.compareSync(
            req.body.password, user.password);
        if(!passwordIsValid){
            return res.json(401,{
                message: 'Please fill valid credentials'
            })
        }

        const token = jwt.sign({ email: user.email },
            config.secret,
            {
              algorithm: 'HS256',
              allowInsecureKeySizes: true,
              expiresIn: 86400, // 24 hours
            });


            res.status(200).send({
                email: user.email,
                name: user.name,
                orders: user.orders,
                accessToken: token

            })

 
    
    } catch (error) {
        return res.json(500, {
            message:"internal server error",
            error: error
        })
    }
};