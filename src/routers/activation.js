const express = require('express')
const Activation = require('../models/activation')
const sendsms = require('../sms/sms')
const bcrypt = require('bcryptjs')
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
            if (user.status) {
                throw new Error('This number already verified !')
            }
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

router.post('/activation/verify', async (req, res) => {
    try {
        const user = await Activation.findOne({ number: req.body.number })
        if (!user || user.status) {
            throw new Error('This number already verified !')
        }
        const isMatch = await bcrypt.compare(req.body.code, user.code)
        if(!isMatch) {
            throw new Error("Wrong Code !")
        }
        user.status = true
        await user.save()
        res.send({ message: "Verified ! " })
    } catch(e) {
        res.status(400).send({ message: e.message })
    }
})

module.exports = router