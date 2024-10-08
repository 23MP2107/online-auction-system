const express = require('express')
const { getMain, getAuctions, getSell, getLogin, getContact, getSignup, signup, login, logout, subscribe, sell, getBidPage, bid } = require('../controllers/user')
const { isLoggedin, loginTest } = require('../middleware/user')
const router = express.Router()
const upload = require('../middleware/upload'); // Import the Multer middleware


router
    .route('/')
    .get(loginTest,getMain)


router
    .route('/auctions')
    .get(loginTest,getAuctions)

router
    .route('/sell')
    .get(isLoggedin,loginTest,getSell)
    .post(isLoggedin,upload.single('image'),sell)

router
    .route('/login')
    .get(loginTest,getLogin)
    .post(login)

router
    .route('/signup')
    .get(loginTest,getSignup)
    .post(signup)

router
    .route('/contact')
    .get(loginTest,getContact)

router
    .route('/logout')
    .get(logout)

router
    .route('/subscribe')
    .post(subscribe)

router
    .route('/bid/:id')
    .get(isLoggedin,loginTest,getBidPage)

router
    .route('/bid')
    .post(isLoggedin,bid)

module.exports = router