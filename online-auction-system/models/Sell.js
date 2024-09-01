const mongoose = require('mongoose')

const sellSchema = new mongoose.Schema({
    // id:String,
    // name:String,
    // price:Number,
    // description:String,
    // category:String,
    // condition:String,
    // email:String

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    imagePath: {
        type: String, // Field to store the path to the uploaded image
        required: false // You can make this required if necessary
    }
})
  
module.exports=mongoose.model('Sell',sellSchema)