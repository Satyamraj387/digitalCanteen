/** @format */
const { sendOtp } = require("../config/nodeMailer");

const db = require("../config/db");
const config = require("../config/auth");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports.userFetcher = async (req, res) => {
  try {
    // console.log("params working egbekjbvkjrgregeg");
    const results = await db.query(`select * from users1 where email=$1`, [
      req.body.email,
    ]);
    var user = results.rows[0];
    // user.filter((e)=>{
    //   return (!(e=='password'))
    // })
    delete user.password;

    // console.log(user)

    return res.json(200, {
      message: "Success",
      body: user,
      success: true,
    });
  } catch (error) {
    return res.json(400, {
      message: error,
      success: false,
    });
  }
};

module.exports.fetcher = async (req, res) => {
  try {
    // console.log("trying in userController")
    const results = await db.query("SELECT * FROM users1");

    return res.json(200, {
      message: "Successfully fetched all users",
      data: results,
      success: true,
    });
  } catch (error) {
    return res.json(400, {
      message: error,
      success: false,
    });
  }
};
module.exports.verifier = async (req, res) => {
  try {
    // console.log("trying in userController")
    // console.log("in verifier",req.body)
    return res.json(200, {
      message: "Success",
      success: true,
      body: req.body,
    });
  } catch (error) {
    return res.json(400, {
      message: error,
      success: false,
    });
  }
};

module.exports.insertUser = async (req, res) => {
  try {
    const results = await db.query(`select * from users1 where email=$1`, [
      req.body.email,
    ]);
    // console.log(req.body);
    // console.log(results.rows);

    if (results?.rows[0]) {
      return res
        .status(403)
        .json({ success: false, message: "user already exists" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    await sendOtp(req.body.email, otp);

    var password = bcrypt.hashSync(req.body.password, 8);
    await db.query(
      `INSERT INTO "users1" ("email","name","password","orders","otp")  
             VALUES ($1, $2,$3, $4,$5)`,
      [req.body.email, req.body.name, password, req.body.orders, otp]
    ); // sends queries
    return res.json(200, {
      message: "Successfully signed up. Please login",
      success: true,
    });
  } catch (error) {
    return res.json(400, {
      message: "Sorry try again",
      success: false,
      error: error,
    });
  }
};

module.exports.validateUser = async (req, res) => {
  try {
    // console.log(req.body);
    const results = await db.query(`select * from users1 where email=$1`, [
      req.body.email,
    ]);
    var user = results.rows[0];
    if (user.otp !== "") {
      return res
        .status(400)
        .json({ success: false, message: "Your OTP verification is pending" });
    }
    // console.log(user);
    // var userId = results.rows[0].id;
    // return res.json(200, user.password);
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.json(401, {
        success: false,
        message: "Please fill valid credentials",
      });
    }

    const token = jwt.sign({ email: user.email }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      email: user.email,
      name: user.name,
      orders: user.orders,
      accessToken: token,
      message: "You have been successfully logged in",
      success: true,
    });
  } catch (error) {
    return res.json(500, {
      message: "internal server error",
      error: error,
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const email = req.body?.email;
    // console.log(req);
    const otp = Math.floor(100000 + Math.random() * 900000);
    // console.log(otp);
    await db.query(`update users1 set otp = $1 where email= $2`, [otp, email]);
    await sendOtp(email, otp);
    res.status(200).send({
      email: email,
      message: "otp sent",
      success: true,
    });
  } catch (error) {
    return res.json(500, {
      message: "Some error in sending OTP",
      success: false,
      error: error,
    });
  }
};
module.exports.validateotp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otp1 = await db.query(`select otp from users1 where email=$1`, [
      req.body?.email,
    ]);
    const generatedOtp = otp1.rows[0].otp;

    if (generatedOtp && generatedOtp === otp) {
      await db.query(`update users1 set otp = $1 where email= $2`, ["", email]);
      res.status(200).json({
        success: true,
        message: "Verified successfully. You can login now",
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Kindly fill correct OTP" });
    }
  } catch (error) {
    console.log("Error validating OTP:", error);
    res.status(500).json({ success: false, error: "Error validating OTP" });
  }
};
module.exports.changepass = async (req, res) => {
  try {
    const { email, otp } = req.body;
    var password = bcrypt.hashSync(req.body?.password, 8);

    const otp1 = await db.query(`select otp from users1 where email=$1`, [
      req.body?.email,
    ]);
    const generatedOtp = otp1?.rows[0]?.otp;
    // console.log(req.body);
    if (generatedOtp && generatedOtp === otp) {
      await db.query(
        `update users1 set otp = $1 , password = $2 where email= $3`,
        ["", password, email]
      );
      res.status(200).json({
        success: true,
        message: "Successfully changed your password. You can login now",
      });
    } else {
      res.status(404).json({ success: false, message: "OTP Mismatch" });
    }
  } catch (error) {
    console.log("Error validating OTP:", error);
    res.status(500).json({ success: false, error: "Error validating OTP" });
  }
};

module.exports.editName = async (req, res) => {
  try {
    const name = req.body?.name;
    const email = req.body?.email;
    console.log(req);
    await db.query(`update users1 set name = $1 where email= $2`, [
      name,
      email,
    ]);
    res.status(200).send({
      name: name,
      message: "name changed successfully",
      success: true,
    });
  } catch (error) {
    return res.json(500, {
      message: "Some error in editing name",
      success: false,
      error: error,
    });
  }
};
