const express = require('express')
const router = express.Router()
require('dotenv').config()

const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
    try {

        const users = await User.find({})

        return res.status(200).json({
            data: users
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message })
    }
})

router.post('/add', async (req, res) => {
    try {
        if (
            !req.body.email ||
            !req.body.password ||
            !req.body.personalNum ||
            !req.body.phoneNum ||
            !req.body.name
        ) {
            return res.status(400).send({
                message: 'Send all required fields'
            })
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = {
            email: req.body.email,
            password: hashedPassword,
            personalNum: req.body.personalNum,
            phoneNum: req.body.phoneNum,
            name: req.body.name,
        }

        const user = await User.create(newUser)

        return res.status(200).send(user)
    
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).send('User not found');
        }

        if (await bcrypt.compare(password, user.password)) {

            const tokenUser = { id: user._id, email: user.email }
            const accessToken = jwt.sign(
                tokenUser,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );

            console.log(accessToken);

            return res.status(200).json({
                message: 'Successfully loged in',
                user: user,
                accessToken: accessToken
            })
        } else {
            res.status(401).send('Not Allowed')
        }
        
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await User.findByIdAndDelete(id)

        if (!result) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.status(200).send({ message: 'User deleted successfully' })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

router.put('/update/:id', async (req, res) => {
    const updates = req.body

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true }
        )

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        console.log(user);

        res.status(201).json({
            message: 'User Updated',
            user: user
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message)
    }
})

module.exports = router