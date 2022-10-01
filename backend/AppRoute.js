const express = require('express')
const router = express.Router();
const User = require('./UserModel')
const {login,signup,autoLogin,logout} = require('./controller')

router.route('/signup').post(signup)
router.route('/login').post(login);
router.route('/checkVisited').post(autoLogin)
router.route('/logout').post(logout)

module.exports = router;