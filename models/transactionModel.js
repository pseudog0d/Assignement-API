const mongoose = require('mongoose')

const transaction = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    walletAddress: {
        type: String,
        required: true,
        // unique: true
    }, 
    transactions: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})



module.exports = mongoose.model('TransactionModel', transaction)