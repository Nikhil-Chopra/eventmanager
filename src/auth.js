const jwt = require('jsonwebtoken')
const User = require('./models/userModel')
require('dotenv').config()

const auth = async (req,res,next) => {
    try {
        let token = req.header('Authorization').replace('Bearer ','')
        // console.log(token)
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        // console.log(decoded._id)
        const user = await User.findOne({_id : decoded._id })
        // console.log(user._id)
        if(!user) throw new Error()
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error : 'Please authenticate'})
    }
}

module.exports = auth