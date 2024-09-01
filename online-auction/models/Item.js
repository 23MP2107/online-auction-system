const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    id:String,
    name:String,
    photo:String,
    text:String,
    active:Boolean,
    bids:[
        {
            amount:Number,
            userid:String,
            username:String
        }
    ],
    highest:{
        amount:Number,
        userid:String,
        username:String
    }
})
  
module.exports=mongoose.model('Item',itemSchema)