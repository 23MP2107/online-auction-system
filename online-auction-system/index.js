require('dotenv').config()

const express = require('express')
const app =express()
const cookieParser = require('cookie-parser')
const multer = require('multer'); // Add Multer for file uploads
const path = require('path');

app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

const connectWithDb = require('./config/database')
connectWithDb()


// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

let userRoute = require('./routes/user')
let adminRoute = require('./routes/admin')
app.use('/',userRoute)
app.use('/admin',adminRoute)

let port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log('app running on port ',port)
})