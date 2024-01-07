const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

const userRoute = require('./routes/userRoute')
const cartRoute = require('./routes/cartRoute')
const productsRoute = require('./routes/productsRoute')
app.use('/users', userRoute)
app.use('/cart', cartRoute)
app.use('/products', productsRoute)


const mongoDBURL = process.env.MONGODBURL
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Successfully connected to database');
        const port = process.env.PORT || 6000
        app.listen(port, () => {
            console.log(`Server up and listening on port ${port}`);
        })
    })
    .catch((err) => {
        console.log(err)
    })
