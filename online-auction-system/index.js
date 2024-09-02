require('dotenv').config()

const express = require('express')
const app =express()
const cookieParser = require('cookie-parser')
const path = require('path');
const mongoose = require('mongoose');

app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.static('public'))
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({extended:false}))
app.use(express.json())
const connectWithDb = require('./config/database')
connectWithDb()

const sellRoutes = require('./routes/sell');
app.use('/sell', sellRoutes); // Mount under /sell
// Route to handle form submission and file upload

let userRoute = require('./routes/user')
let adminRoute = require('./routes/admin')
app.use('/',userRoute)
app.use('/admin',adminRoute)


let port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log('app running on port ',port)
})