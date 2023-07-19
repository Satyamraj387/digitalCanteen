const {fetcher,insertUser,validateUser,verifier,userFetcher}= require("../controllers/userController");

const { authJwt } = require("../middleware");

const express= require('express');

const router= express.Router();

router.post('/verify',[authJwt.verifyToken],verifier);
router.post('/signup',insertUser);
router.post('/login', validateUser);
router.post('/',[authJwt.verifyToken], userFetcher);



module.exports = router;


// //jkfhkfbdkb





// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.post(
//     "/api/auth/signup",
//     [
//       verifySignUp.checkDuplicateUsernameOrEmail,
//       verifySignUp.checkRolesExisted
//     ],
//     controller.signup
//   );

//   app.post("/api/auth/signin", controller.signin);
// };



// //fiodfeh



// const { authJwt } = require("../controllers/middleware");
// const controller = require("../controllers/user.controller");

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();