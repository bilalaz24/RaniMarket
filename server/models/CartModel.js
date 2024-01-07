const mongoose = require('mongoose')
const Product = require('./ProductsModel')
const User = require('./UserModel')

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less than 1'],
        default: 1
    }
})

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        items: [cartItemSchema],
    },
    {
        timestamps: true
    }
)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart