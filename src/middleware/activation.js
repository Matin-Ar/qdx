const User = require("../models/user")

const activation = async (req, res, next) => {
    try {
        const user
        if(!user.verify){
            throw new Error()
        }
        next()
    } catch (e) {
        res.status(401).send({ error: 'You have to verify!' })
    }
}

module.exports = activation