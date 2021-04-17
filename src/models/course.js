const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    subset: {
        type: String,
        required: true,
       // ref: 'Tutorial'
    }
}, {
    timestamps: true
})


courseSchema.plugin(uniqueValidator)

const Course = mongoose.model('Course', courseSchema)

module.exports = Course