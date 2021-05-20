const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')
var cors = require('cors')
const User = require('../models/user')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const { sendWelcomeEmail, sendCancelatonEmail } = require('../emails/account')
const router = new express.Router()

router.post('/users/singup', async (req, res) => {
    try {
        if(req.body.role){
            throw new Error('You can not choose role!')
        }
        await User.verify(req.body.number, req.body.code)
        const user = new User(req.body)
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch(e) {
        res.status(400).send({ error: e.message})
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'lastname', 'gender', 'bday', 'codinglanguage', 'education']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//change password
router.patch('/users/password', auth, async (req, res) => {
    try {
        await User.verify(req.user.number, req.body.code)
        req.user.password = req.body.password
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})


router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancelatonEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }

})

router.post('/users/me/avatar', auth, cors(), upload.single('avatar'), async (req, res) => {
    if (!req.file) {
        res.status(400).send({ error: "Provide avatar"})
    } else {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        req.user.avatar = buffer
        await req.user.save()
        res.send()
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            throw new Error()
        }
        if (!user.avatar){
            user.avatar = fs.readFileSync('./src/avatar/avatar.png')
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }   catch (e) {
        res.status(404).send()
    }
})

//admin
router.get('/users/profiles', auth, adminAuth, async (req, res) => {
    try {
        const profiles = await User.find({ }, 'email', { sort: { email : 1 }, limit: parseInt(req.query.limit), skip: parseInt(req.query.skip) })
        res.send(profiles)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/users/profiles', auth, adminAuth, async (req, res) => {
    try {
        const profile = await User.findById(req.body.id)
        await profile.delete()
        res.send({ message: 'Deleted !'})
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router