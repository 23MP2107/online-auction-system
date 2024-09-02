let User = require('../models/User')
let Sub = require('../models/Subscription')
let Sell = require('../models/Sell')
let Item = require('../models/Item')
const userCookie = require('../utils/userCookie')
const mongoose = require('mongoose'); // Import mongoose

exports.getMain = async(req,res)=>{
    let items = await Item.find({active:true}).limit(4)
    res.render('main',{islogin:req.islogin,sub:'',items})
}

exports.getAuctions = async(req,res)=>{
    let items = await Item.find({active:true})
    res.render('auctions',{islogin:req.islogin,items})
}

exports.getSell = (req,res)=>{
    res.render('sell',{islogin:req.islogin})
}

exports.getContact = (req,res)=>{
    res.render('contact',{islogin:req.islogin})
}
exports.getLogin = (req,res)=>{
    res.render('login',{islogin:req.islogin,msg:''})
}

exports.getSignup = (req,res)=>{
    res.render('signup',{islogin:req.islogin})
}

exports.signup = async (req,res)=>{
    req.body.id=`${Date.now()}`
    await User.create(req.body)

    res.redirect('/login')
}

exports.login = async (req,res)=>{
    let {email,password}=req.body

    if(!email || !password){
        return res.render('login',{msg:"Enter Email and Password",islogin:req.islogin})
    }
    email=email.toLowerCase()
    const user =  await User.findOne({email:email}).select("+password")

    if(!user){
        return res.render('login',{msg:"Incorrect Email or Password",islogin:req.islogin})
    }
    const isPasswordCorrect = await  user.isValidatedPassword(password)
    if(!isPasswordCorrect){
        return res.render('login',{msg:"Incorrect Email or Password",islogin:req.islogin})
     }
     if(user.isAdmin===true){
        userCookie(user,res)
       return res.redirect('/admin')
     }
     userCookie(user,res)
    
        
    }
    
    
exports.logout = (req,res)=>{
    res.cookie('user',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.redirect('/login')
}

exports.subscribe = async(req,res)=>{
    await Sub.create({
        email:req.body.email
    })
    return res.render('main',{islogin:req.islogin,sub:"Subscribed Succesfullly"})
}

// exports.sell = async(req,res)=>{
//     req.body.id=Date.now()
//     console.log(req.user)
//     req.body.email=req.user.email
//     await Sell.create(req.body)
//     return res.redirect('/')
// }
exports.sell = async (req, res) => {
    // Validate form fields
    if (!req.body.name || !req.file || !req.body.description || !req.body.price || !req.body.category || !req.body.condition) {
        return res.status(400).send('All fields are required.');
    }

    try {
        const userId = req.user ? mongoose.Types.ObjectId(req.user.id) : null;

        // Save the data
        await Sell.create({
            name: req.body.name,
            email: req.body.email, // Ensure the email is sent and handled correctly
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            condition: req.body.condition,
            imagePath: req.file.path, // Save file path
            userId: userId// Use user ID if available
        });
        return res.redirect('/'); // Redirect after successful creation
    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            return res.status(500).send('Server error');
    }
}
   
};

exports.getBidPage = (req,res)=>{
    let id = req.params.id
    return res.render('bid',{id,islogin:req.islogin})
}

exports.bid = async(req,res)=>{
    console.log(req.body)
    console.log(req.user)
    let item = await Item.findOne({id:req.body.id})

    let prevHighest = item.highest.amount
    let amount = req.body.amount
    item.bids.push({
        amount:amount,
        userid:req.user.id,
        username:req.user.name
    })
    if(amount>prevHighest){
        item.highest = {
            amount:amount,
            userid:req.user.id,
            username:req.user.name
        }
    }
    await item.save()

    return res.redirect('/')
}

