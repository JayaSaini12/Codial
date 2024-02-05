const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


//middleware passport.authen is using ths straty in index.js
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                // console.log('Error in finding user --> Parrport');
                return done(err); //takes 2 argument
            }
            if (!user || user.password !=password){
                req.flash('error', 'Invalid username/Password');
                // console.log('Invalid Username/Password'); 
                return done(null, false);
            }
            return done(null, user);//if found user will return 
        });
    }
));
//return user to serializer
// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null, user.id);//aur yeh id ko encrtpt karke using session wala cheez,cokkie mai dalke bhej dega 
});
// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
        if(err){
                console.log('Error in finding user --> Parrport');
                return done(err); //takes 2 argument
    }
    return done(null, user);
});
});
//deserialize finds out which user is using

//ab hum deserilaizer use karke current user ko dhundege
//check if user is authenticated
//it will be use as middleware
passport.checkAuthentication=function(req,res,next){
    //if user signed in then pass on the request
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signin
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains current signed in user from the session cookie we are sending now to the lcoals for the views
        res.locals.user=req.user;
    }
    next();
}
module.exports = passport;