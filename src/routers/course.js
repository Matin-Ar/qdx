const express = require('express')
const Course = require('../models/course')
const Tutorial = require('../models/tutorial')
const router = new express.Router()

router.post('/courses', async (req,res) => {
   

    try {
        const tut = await Tutorial.findOne({ name: req.body.tut })
        const course = new Course({
            name: req.body.name,
            tut: tut._id
        })
        await course.save()
        res.status(201).send(course)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router