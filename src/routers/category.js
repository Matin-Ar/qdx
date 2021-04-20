const express = require('express')
const Category = require('../models/category')
const Tutorial = require('../models/tutorial')
const Course = require('../models/course')
const router = new express.Router()

router.post('/categories', async (req, res) => {
    const category = new Category(req.body)

    try {
        await category.save()
        res.status(201).send(category)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/categories', async (req,res) => {
    const category = await Category.find({ }, null, { sort: { name: 1 } })

    try {
        res.send(category)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/categories/:cat', async (req, res) => {
    const cat = req.params.cat

    try {
        const category = await Category.findOne({ name: cat })
        const tutorials = await Tutorial.find({ cat: category._id }, null, { sort: { name: 1} })
        res.send(tutorials)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/categories', async (req, res) => {
    try {
        if(!req.body.oldname || !req.body.newname) {
            throw new Error()
        }
        const category = await Category.findOneAndUpdate({ name: req.body.oldname }, { name: req.body.newname })
        if(!category) {
            throw new Error()
        }
        res.send()
    } catch(e) {
        res.status(400).send()
    }
})

router.delete('/categories', async (req, res) => {
    try {
        const category = await Category.findOne({ name: req.body.name })
        if(!category) {
            throw new Error('No category!')
        }
        const tutorials = await Tutorial.find({ cat: category._id })
        tutorials.forEach(async(tutorial) => {
            await Course.deleteMany({ tut: tutorial._id })
        })
        await Tutorial.deleteMany({ cat: category._id})
        category.remove()

        res.send({ message: "Deleted!"})
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router