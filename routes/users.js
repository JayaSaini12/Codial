const express = require("express");
const router = express.Router();
const passport = require('passport');
const userscontroller = require("../controllers/users_controller");

router.get("/profile/:id", passport.checkAuthentication,userscontroller.profile);
router.post('/update/:id', passport.checkAuthentication, userscontroller.update);
router.get("/sign-up", userscontroller.signup);
router.get("/sign-in", userscontroller.signin);
router.post("/create", userscontroller.create);
// use passport as a middleware to authenticate;
router.post("/create-session", passport.authenticate(
    'local',
    {failureRedirect: '/users/sign_in'},
),userscontroller.createSession);

router.get('/sign-out',userscontroller.destroySession);


router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userscontroller.createSession);

module.exports = router;

