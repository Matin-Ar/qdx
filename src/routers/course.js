const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const Course = require('../models/course')
const Tutorial = require('../models/tutorial')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const router = new express.Router()

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

router.post('/api/courses', auth, adminAuth, upload.single('avatar'), async (req,res) => {
    try {
        const tut = await Tutorial.findOne({ name: req.body.tut })
        const buffer = await sharp(req.file.buffer).resize({ width: 390, height: 240 }).png().toBuffer()
        req.body.links = req.body.links.split(',')
        const course = new Course({
            ...req.body,
            tut: tut._id,
            avatar: buffer
        })
        await course.save()
        res.status(201).send(course)
    } catch(e) {
        res.status(400).send(e)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.patch('/api/courses/:title', auth, adminAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'shortdesc', 'longdesc', 'duration', 'author', 'publisher', 'language', 'numberofvideos', 'filedate', 'quality', 'filesize', 'links']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation || !req.params.title) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    if(req.body.links) {
        req.body.links = req.body.links.split(',')
    }

    try {
        course = await Course.findOne({ title: req.params.title})
        if (!course) {
            throw new Error('Can not find course!')
        }
        updates.forEach((update)=> {
            course[update] = req.body[update]
        })
        await course.save()
        res.send(course)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/courses', auth, adminAuth, async (req, res) => {
    try {
        const course = await Course.findOne({ title: req.body.title })
        if(!course) {
            throw new Error('No course!')
        }
        await course.remove()

        res.send({ message: "Deleted!"})
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/courses', async (req, res) => {
    try {
        const course = await Course.find({ }, null, { sort: { title : 1 }, limit: parseInt(req.query.limit), skip: parseInt(req.query.skip) })
        res.send(course)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/api/courses/:title', async (req, res) => {
    try {
        const course = await Course.findOne({ title: req.params.title })
        if (!course) {
            throw new Error()
        }
        res.send(course)
    }   catch (e) {
        res.status(404).send()
    }
})

router.get('/api/courses/:title/avatar', async (req, res) => {
    try {
        const course = await Course.findOne({ title: req.params.title })
        if (!course) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(course.avatar)
    }   catch (e) {
        res.status(404).send()
    }
})


module.exports = router