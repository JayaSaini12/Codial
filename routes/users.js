const express = require("express");
const router = express.Router();
const passport = require('passport');
const userscontroller = require("../controllers/users_controller");

router.get("/profile", passport.checkAuthentication,userscontroller.profile);
router.get("/sign-up", userscontroller.signup);
router.get("/sign-in", userscontroller.signin);
router.post("/create", userscontroller.create);
// use passport as a middleware to authenticate;
router.post("/create-session", passport.authenticate(
    'local',
    {failureRedirect: '/users/sign_in'},
),userscontroller.createSession);

router.get('/sign-out',userscontroller.destroySession);
module.exports = router;
