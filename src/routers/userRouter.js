const express =  require('express')
const router = new express.Router()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.JWT_SECRET

router.post('/signup' ,async function (req,res){
    const user = new User(req.body)
    try {
        const token = jwt.sign({ _id: user._id.toString() } , secret)
        await user.save()
        res.status(201).send(token)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/login' , async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = jwt.sign({ _id: user._id.toString() } , secret)
        // console.log(token)
        res.status(201).send(token)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = router