//is valid signup up ?
const User = require('../models/user')

const signup = async (req, res, next) => {
    try {
        if(!req.body.number || !req.body.email) {
            throw new Error('Provide number and email !')
        }
        const text = []
        const number = await User.findOne({ number: req.body.number })
        const email = await User.findOne({ email: req.body.email })
        if(number) {
            text.push('Number alread used !')
        }
        if(email) {
            text.push('Email already used !')
        }
        if (number || email) {
            throw new Error(text.toString())
        }
        
        next()
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

module.exports = signup