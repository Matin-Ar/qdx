const Activation = require('../models/activation')

const verify = async (req, res, next) => {
    try {
        const user = await Activation.findOne({ number: req.body.number })
        if (!user || !user.status) {
            throw new Error()
        }
        next()
    } catch (e) {
        res.status(401).send({ error: 'You have to verify !' })
    }
}

module.exports = verify