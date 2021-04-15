const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    subset: {
        type: String,
        required: true,
        ref: 'Tutorial'
    }
}, {
    timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course