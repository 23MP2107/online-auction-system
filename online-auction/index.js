require('dotenv').config()

const express = require('express')
const app =express()
const cookieParser = require('cookie-parser')

app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

const connectWithDb = require('./config/database')
connectWithDb()

let userRoute = require('./routes/user')
let adminRoute = require('./routes/admin')
app.use('/',userRoute)
app.use('/admin',adminRoute)

let port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log('app running on port ',port)
})