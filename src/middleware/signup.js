//is valid signup up ?
const User = require('../models/user')

const signup = async (req, res, next) => {
    try {
        if(!req.body.number) {
            throw new Error('Provide number !')
        }
        const text = []
        const number = await User.findOne({ number: req.body.number })
        const email = await User.findOne({ email: req.body.email })
        if(number) {
            text.push('این شماره قبلا ثبت شده است !')
        }
        if(email) {
            text.push('این ایمیل قبلا ثبت شده است !')
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