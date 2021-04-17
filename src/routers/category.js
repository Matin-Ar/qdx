const express = require('express')
const Category = require('../models/category')
const router = new express.Router()

router.post('/categorys', async (req,res) => {
    const categoty = new Category(req.body)

    try {
        await categoty.save()
        res.status(201).send(categoty)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/categorys', async (req,res) => {
    const category = await Category.find({ })

    try {
        res.send(category)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router