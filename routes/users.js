const express = require('express');
const router = express.Router();

const userscontroller = require('../controllers/users_controller');

router.get('/profile', userscontroller.profile);

// router.get('/bhalu', userscontroller.bhalu);
// router.get('bhais', userscontroller.bhais);

module.exports = router;