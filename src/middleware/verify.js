const Activation = require('../models/activation')
const bcrypt = require('bcryptjs')

const verify = async (req, res, next) => {
    try {
        if(!req.body.code){
            throw new Error('Provide code !')
        }
        const user = await Activation.findOne({ number: req.body.number })
        if (!user) {
            throw new Error('You dont have verification code !')
        }
        const isMatch = await bcrypt.compare(req.body.code, user.code)
        if(!isMatch) {
            throw new Error("کد تایید نامعتبر می باشد !")
        }
        await user.remove()

        next()
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

module.exports = verify