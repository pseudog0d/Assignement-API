const mongoose = require('mongoose')

const ethPrice = new mongoose.Schema({
    ethPrice: {
        type: Number,
        required: true,
        // unique: true
    }, 
    createdAt: {
        type: Date,
        default: new Date()
    }
})



module.exports = mongoose.model('ethPriceModel', ethPrice)