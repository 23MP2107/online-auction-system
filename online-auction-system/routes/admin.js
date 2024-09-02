const express = require('express')
const { isLoggedin, loginTest } = require('../middleware/user')
const { getSells, getSubscriptions, getAdd, addItem, getOngoings, getPrevious, viewItem, changeActive } = require('../controllers/admin')
const router = express.Router();

router
    .route('/login')
    .get((req,res)=>{
        res.render('admin/login')
    })

router
    .route('/')
    .get((req,res)=>{
        res.redirect('/admin/ongoing')
    })

router
    .route('/sell-requests')
    .get(getSells)

router
    .route('/subscriptions')
    .get(getSubscriptions)

router
    .route('/add')
    .get(getAdd)
    .post(addItem)

router
    .route('/ongoing')
    .get(getOngoings)

router
    .route('/previous')
    .get(getPrevious)

router
    .route('/view/:id')
    .get(viewItem)

router
    .route('/delete/:id')
    .get(changeActive)

module.exports = router