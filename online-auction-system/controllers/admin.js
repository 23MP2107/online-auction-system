let Sub = require('../models/Subscription')
let Sell = require('../models/Sell')
let Item = require('../models/Item')

exports.getSells = async(req,res)=>{
    let sells = await Sell.find().sort({id:-1})
    console.log(sells);
    return res.render('admin/sell',{sells})
}

exports.getSubscriptions = async(req,res)=>{
    let subs = await Sub.find().sort({id:-1})
    return res.render('admin/subscription',{subs})
}

exports.getAdd = (req,res)=>{
    return res.render('admin/add')
}

exports.addItem = async(req,res)=>{
    console.log(req.body)

    await Item.create({
        id:`${Date.now()}`,
        name:req.body.name,
        photo:req.body.photo,
        text:req.body.text,
        active:true,
        highest:{
            amount:0,
            userid:'admin',
            username:'admin'
        }
    })

    return res.redirect('/admin/ongoing')
}

exports.getOngoings = async(req,res)=>{
    let items = await Item.find({active:true}).sort({id:-1})
    return res.render('admin/ongoing',{items})
}

exports.getPrevious = async(req,res)=>{
    let items = await Item.find({active:false}).sort({id:-1})
    return res.render('admin/previous',{items})
}

exports.viewItem = async(req,res)=>{
    let item = await Item.findOne({id:req.params.id})
    return res.render('admin/view',{item})
}

exports.changeActive = async(req,res)=>{
    let item = await Item.findOne({id:req.params.id})
    item.active=false
    await item.save()
    return res.redirect('/admin/previous')
}