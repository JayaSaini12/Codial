// const passport = require('passport');
// const JWTStrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;

// const User=require('../models/user');
// const { ExtractJwt } = require('passport-jwt');

// let opts={
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKeyn:'codial'
// }

// //fetching id from payload and check if the user is present
// passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
//     User.findById(jwtPayLoad._id,function(err,user){
//         if(err){console.log('Error in finding user from JWT');return;}
//         if(user){
//             return done(null,user);
//         }else{
//             return done(null,false);
//         }
//     })
// }))

// module.exports=passport;
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env=require('./environment');

const User = require('../models/user');
const { eventNames } = require('../models/post');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    User.findById(jwtPayLoad._id, function(err, user){
        if (err){console.log('Error in finding user from JWT'); return;}

        if (user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })

}));

module.exports = passport;