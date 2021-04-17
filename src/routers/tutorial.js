const express = require('express')
const Tutorial = require('../models/tutorial')
const Category = require('../models/category')
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

module.exports = router