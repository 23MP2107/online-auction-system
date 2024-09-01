const mongoose = require('mongoose')

const sellSchema = new mongoose.Schema({
    id:String,
    name:String,
    price:Number,
    description:String,
    category:String,
    condition:String,
    email:String
})
  
module.exports=mongoose.model('Sell',sellSchema)