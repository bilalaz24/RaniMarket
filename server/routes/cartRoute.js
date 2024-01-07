const express = require('express')
const router = express.Router()

const Product = require('../models/ProductsModel')
const Cart = require('../models/CartModel')

const authenticateToken = require('../middlewares/authenticateToken')


router.post('/add', authenticateToken, async (req, res) => {
    const { productId, quantity } = req.body
    const id = req.user.id

    try {
        let cart = await Cart.findOne({ userId: id })
        if (!cart) {
            cart = new Cart({ userId: id, items: [] })
        }

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).send('Product not found')
        }

        if (!cart || !product) {
            return res.status(404).send('Cart or product not found')
        }

        const cartItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (cartItemIndex > -1) {
            cart.items[cartItemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save()

        res.status(200).json({ message: 'Item added to cart', cart })
    } catch (err) {
        res.status(500).send(err.message);
        console.log(err);
    }
})

router.delete('/remove', authenticateToken, async (req, res) => {
    const { productId } = req.body;
    const id = req.user.id

    try {
        let cart = await Cart.findOne({ userId: id });

        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();
        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/deleteAll', authenticateToken, async (req, res) => {
    try {
        const id = req.user.id

        let cart = await Cart.findOne({ userId: id });

        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        cart.items = []

        await cart.save();
        res.status(200).json({ message: 'Products removed from cart', cart });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/update-product', authenticateToken, async (req, res) => {
    const { productId, newQuantity } = req.body;
    const id = req.user.id

    try {
        let cart = await Cart.findOne({ userId: id });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).send('Product not found in cart');
        }

        if (newQuantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = newQuantity;
        }

        await cart.save();
        res.status(200).json({ message: 'Product updated successfully in cart', cart });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send(err.message);
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const id = req.user.id

        const cart = await Cart.findOne({ userId: id }).populate('items.product');

        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        res.json(cart);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router