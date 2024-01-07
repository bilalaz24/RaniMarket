const express = require('express')
const router = express.Router()

const Product = require('../models/ProductsModel')


router.get('/', async (req, res) => {
    try {

        const products = await Product.find({})

        return res.status(200).json({
            data: products
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const product = await Product.find({_id: id})

        return res.status(200).json({
            data: product
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message })
    }
})

module.exports = router