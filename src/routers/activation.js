const express = require('express')
const Activation = require('../models/activation')
const sendsms = require('../sms/sms')
const router = new express.Router()

router.post('/activation/sendcode', async (req, res) => {
    try {
        const randomCode = (Math.floor(Math.random() * 9000 + 1000)).toString()
        const user = await Activation.findOne({ number: req.body.number })
        if (!user) {
            const user = new Activation({
                number: req.body.number,
                code: randomCode
            })
            await user.save()
        } else {
            user.code = randomCode
            await user.save()
        }
        await sendsms(req.body.number, randomCode)
        res.send({ message: "Code sent!" })
    } catch(e) {
        console.log(e.message)
        res.status(400).send({ message: e.message })
    }
})

module.exports = router