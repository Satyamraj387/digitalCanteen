const jwt = require("jsonwebtoken");
const config = require("../config/auth");


verifyToken = (req, res, next) => {
  
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      success:false,
      message: "You need to login first"
    });
  }

  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).json({
                  success:false,
                  message: "Unauthorized!",
                });
              }
              // console.log(decoded)  //gives the id iat and exp
              req.body.email = decoded.email;

              next();
              
            });
};


const authJwt = {
  verifyToken: verifyToken
};
module.exports = authJwt;