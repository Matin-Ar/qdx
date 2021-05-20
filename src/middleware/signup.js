//is valid signup up ?
const User = require('../models/user')

const signup = async (req, res, next) => {
    try {
        const number = await User.findOne({ number: req.body.number })
        if(number) {
            throw new Error('Number already used !')
        }
        const email = await User.findOne({ email: req.body.email })
        if(email) {
            throw new Error('Email already used !')
        }
        
        next()
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

module.exports = signup