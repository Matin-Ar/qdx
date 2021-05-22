const express = require('express')
const Activation = require('../models/activation')
const sendsms = require('../sms/sms')
const auth = require('../middleware/auth')
const signup = require('../middleware/signup')
const router = new express.Router()

router.post('/api/activation/sendcode', signup, async (req, res) => {
    try {
        // await Activation.signup(req.body.number, req.body.email)
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
        res.send({ message: "کد ارسال شد !" })
    } catch(e) {
        res.status(400).send({ error: e.message })
    }
})

router.post('/api/verification/sendcode', auth, async (req, res) => {
    try {
        const randomCode = (Math.floor(Math.random() * 9000 + 1000)).toString()
        const user = await Activation.findOne({ number: req.user.number })
        if (!user) {
            const user = new Activation({
                number: req.user.number,
                code: randomCode
            })
            await user.save()
        } else {
            user.code = randomCode
            await user.save()
        }
        await sendsms(req.user.number, randomCode)
        res.send({ message: "کد ارسال شد !" })
    } catch(e) {
        res.status(400).send({ error: e.message })
    }
})

module.exports = router