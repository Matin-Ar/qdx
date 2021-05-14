const express = require('express')
const Course = require('../models/course')
const Comment = require('../models/comment')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const router = new express.Router()

router.post('/comments', auth, async (req,res) => {    
    try {
        const course = await Course.findOne({ _id: req.body.courseId }, "title")
        const comment = new Comment({
            title: req.body.title,
            desc: req.body.desc,
            condition: false,
            course: course._id,
            user: req.user._id
        })
        await comment.save()
        res.status(201).send(course)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/comments', auth, adminAuth, async (req, res) => {
    try {
        const comments = await Comment.find({ condition: false})
        res.send(comments)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/comments/:courseId', async (req, res) => {
    try {
        const comments = await Comment.find({ course: req.params.courseId , condition: true})
        res.send(comments)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/comments', auth, adminAuth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.body.id)
        if (!comment){
            throw new Error()
        }
        await comment.remove()
        res.send(comment)
    } catch(e) {
        res.status(400).send()
    }
})

router.patch('/comments', auth, adminAuth, async (req, res) => {
    try {
        if(!req.body.condition || req.body.condition != true) {
            req.body.condition = false
        }
        const comment = await Comment.findByIdAndUpdate(req.body.id, { condition: req.body.condition })
        if (!comment){
            throw new Error()
        }
        res.send({ message: "Updated!"})
    } catch(e) {
        res.status(400).send()
    }
})

module.exports = router