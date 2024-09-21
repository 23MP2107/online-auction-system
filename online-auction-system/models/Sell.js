// const mongoose = require('mongoose')

// const sellSchema = new mongoose.Schema({
//     // id:String,
//     // name:String,
//     // price:Number,
//     // description:String,
//     // category:String,
//     // condition:String,
//     // email:String
//     userId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User', 
//         required: true 
//     }, // Reference to the user who created the sell request
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     category: {
//         type: String,
//         required: true
//     },
//     condition: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String, // Field to store the path to the uploaded image
//         required: true // You can make this required if necessary
//     }
// })
  
// module.exports=mongoose.model('Sell',sellSchema)
const mongoose = require('mongoose');

const sellSchema = new mongoose.Schema({
    userId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: Number, // Store as a Number
        required: true,
        // ref: 'User' // Reference to the User model
    },
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
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Sell', sellSchema);
