const express = require('express');

const router = express.Router();
// with the help of above library you can define routes and middleware on this router instead of directly on the main application
const homecontroller = require('../controllers/home_controller');
console.log('router loaded');

router.get('/', homecontroller.home);
// yeh common file hai yha tak aayega uske baad users type kara hoga toh vha bhej denge
router.use('/users', require('./users'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile'));


module.exports = router; 