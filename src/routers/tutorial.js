const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const Tutorial = require('../models/tutorial')
const Category = require('../models/category')
const Course = require('../models/course')
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

router.post('/tutorials', upload.single('avatar'), async (req,res) => {
    try {
        const cat = await Category.findOne({ name: req.body.cat })
        const buffer = await sharp(req.file.buffer).png().toBuffer()
        const tutorial = new Tutorial({
            name: req.body.name,
            cat: cat._id,
            avatar: buffer
        })
        await tutorial.save()
        res.status(201).send(tutorial)
    } catch(e) {
        res.status(400).send(e)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


router.get('/tutorials', async (req, res) => {
    const tutorial = await Tutorial.find({ }, null, { sort: { name : 1 } })

    try {
        res.send(tutorial)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/tutorials', async (req, res) => {
    try {
        if(!req.body.oldname || !req.body.newname) {
            throw new Error()
        }
        const tutorial = await Tutorial.findOneAndUpdate({ name: req.body.oldname }, { name: req.body.newname })
        if(!tutorial) {
            throw new Error()
        }
        res.send()
    } catch(e) {
        res.status(400).send()
    }
})

router.delete('/tutorials', async (req, res) => {
    try {
        const tutorial = await Tutorial.findOne({ name: req.body.name })
        if(!tutorial) {
            throw new Error('No tutorial!')
        }
        await Course.deleteMany({ tut: tutorial._id })
        await tutorial.remove()

        res.send({ message: "Deleted!"})
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tutorials/:tut', async (req, res) => {
    const tut = req.params.tut

    try {
        const tutorial = await Tutorial.findOne({ name: tut })
        const courses = await Course.find({ tut: tutorial._id }, null, { sort: { name: 1} })
        res.send(courses)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/tutorials/:name/avatar', async (req, res) => {
    try {
        const tutorial = await Tutorial.findOne({ name: req.params.name })
        if (!tutorial) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(tutorial.avatar)
    }   catch (e) {
        res.status(404).send()
    }
})

module.exports = router