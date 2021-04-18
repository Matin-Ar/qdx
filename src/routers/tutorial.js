const express = require('express')
const Tutorial = require('../models/tutorial')
const Category = require('../models/category')
const Course = require('../models/course')
const router = new express.Router()

router.post('/tutorials', async (req,res) => {
    try {
        const cat = await Category.findOne({ name: req.body.cat })
        const tutorial = new Tutorial({
            name: req.body.name,
            cat: cat._id
        })
        await tutorial.save()
        res.status(201).send(tutorial)
    } catch(e) {
        res.status(400).send(e)
    }
})


router.get('/tutorials', async (req, res) => {
    const tutorial = await Tutorial.find({ })

    try {
        res.send(tutorial)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/tutorials/:cat', async (req, res) => {
    const cat = req.params.cat

    try {
        const category = await Category.findOne({ name: cat })
        const tutorials = await Tutorial.find({ cat: category._id }, null, { sort: { name: 1} })
        res.send(tutorials)
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

module.exports = router