// routes/sell.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Sell = require('../models/Sell'); // Adjust the path if needed based on your folder structure

const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder where images will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false);
    }
};

// Set up the multer middleware with storage and file filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
    fileFilter: fileFilter
});

// Route to handle product listing with image upload
router.post('/upload', upload.single('productImage'), async (req, res) => {
    try {
        // Create a new Sell document with form data and image path
        const newSell = new Sell({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            condition: req.body.condition,
            imagePath: req.file.path // Save the path of the uploaded image
        });

        // Save the product to the database
        await newSell.save();

        res.send('Product listed successfully with the image!');
    } catch (error) {
        console.error('Error listing product:', error);
        res.status(500).send('An error occurred while listing the product.');
    }
});

module.exports = router;
