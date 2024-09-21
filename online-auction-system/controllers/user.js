let User = require('../models/User');
let Sub = require('../models/Subscription');
let Sell = require('../models/Sell');
let Item = require('../models/Item');
const userCookie = require('../utils/userCookie');
const mongoose = require('mongoose'); // Import mongoose
const jwt = require('jsonwebtoken'); // JWT package for authentication

// Helper function to get JWT from request headers
const getTokenFromHeader = (req) => {
    const authHeader = req.headers['authorization'];
    return authHeader && authHeader.split(' ')[1]; // Return token or undefined
};

exports.getMain = async(req, res) => {
    let items = await Item.find({ active: true }).limit(4);
    res.render('main', { islogin: req.islogin, sub: '', items });
};

exports.getAuctions = async(req, res) => {
    let items = await Item.find({ active: true });
    res.render('auctions', { islogin: req.islogin, items });
};

exports.getSell = (req, res) => {
    res.render('sell', { islogin: req.islogin });
};

exports.getContact = (req, res) => {
    res.render('contact', { islogin: req.islogin });
};

exports.getLogin = (req, res) => {
    res.render('login', { islogin: req.islogin, msg: '' });
};

exports.getSignup = (req, res) => {
    res.render('signup', { islogin: req.islogin });
};

exports.signup = async (req, res) => {
    req.body.id = `${Date.now()}`;
    await User.create(req.body);
    res.redirect('/login');
};

exports.login = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.render('login', { msg: "Enter Email and Password", islogin: req.islogin });
    }
    email = email.toLowerCase();
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
        return res.render('login', { msg: "Incorrect Email or Password", islogin: req.islogin });
    }
    const isPasswordCorrect = await user.isValidatedPassword(password);
    if (!isPasswordCorrect) {
        return res.render('login', { msg: "Incorrect Email or Password", islogin: req.islogin });
    }

    await userCookie(user, res); // Set cookie for user authentication
    if (user.isAdmin === true) {
        return res.redirect('/admin');
    }

    res.redirect('/');
};

exports.logout = (req, res) => {
    res.cookie('user', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    return res.redirect('/login');
};

exports.subscribe = async(req, res) => {
    await Sub.create({
        email: req.body.email
    });
    return res.render('main', { islogin: req.islogin, sub: "Subscribed Successfully" });
};

// Updated sell function with JWT validation
exports.sell = async (req, res) => {
    const token = getTokenFromHeader(req);
    if (!token) {
        return res.status(401).render('login', { msg: 'Unauthorized: No token provided', islogin: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded JWT payload to req.user

        // Validate form fields
        if (!req.body.name || !req.file || !req.body.description || !req.body.price || !req.body.category || !req.body.condition) {
            return res.status(400).send('All fields are required.');
        }
        
        const userId = Number(req.user.id); // Ensure userId is treated as a Number

        // Save the data
        await Sell.create({
            userId: userId, // Store as a Number
            name: req.body.name,
            email: req.body.email, // Ensure the email is sent and handled correctly
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            condition: req.body.condition,
            imagePath: req.file.path, // Save file path
            // userId: mongoose.Types.ObjectId(req.user.id) // Use user ID from JWT
        });

        return res.redirect('/'); // Redirect after successful creation
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error or unauthorized.');
    }
};

exports.getBidPage = (req, res) => {
    let id = req.params.id;
    return res.render('bid', { id, islogin: req.islogin });
};

// Updated bid function with JWT validation
exports.bid = async (req, res) => {
    const token = getTokenFromHeader(req);
    if (!token) {
        return res.status(401).render('login', { msg: 'Unauthorized: No token provided', islogin: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded JWT payload to req.user

        let item = await Item.findOne({ id: req.body.id });

        let prevHighest = item.highest.amount;
        let amount = req.body.amount;
        item.bids.push({
            amount: amount,
            userid: Number(req.user.id),
            username: req.user.name
        });

        if (amount > prevHighest) {
            item.highest = {
                amount: amount,
                userid: Number(req.user.id),
                username: req.user.name
            };
        }

        await item.save();
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error or unauthorized.');
    }
};

