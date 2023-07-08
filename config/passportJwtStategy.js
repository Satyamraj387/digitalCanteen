// const passport= require('passport');
// const JWTStrategy = require('passport-jwt').Strategy;
// // help to extraxct jwt from header
// const ExtractJWT = require('passport-jwt').ExtractJwt;
// // const env = require('./environment');

// let opts ={
//     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//     secretOrKey : env.jwt_secret
// }

// passport.use(new JWTStrategy(opts, function(jwtPayload, done){

    
//     // User.findById(jwtPayload._id, function(err,user){
//     //     if(err){ console.log('Error in finding user from JWT'); return;}

//     //     if(user){
//     //         //done contains the user 
//     //         return done(null, user);
//     //     }else{
//     //         return done(null, false);
//     //     }
//     // })
// }));
// module.exports = passport;