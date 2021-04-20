const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    shortdesc: {
        type: String,
        required: true,
        trim: true
    },
    longdesc: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
    numberofvideos: {
        type: String,
        required: true,
        trim: true
    },
    filedate: {
        type: String,
        required: true,
        trim: true
    },
    quality: {
        type: String,
        required: true,
        trim: true
    },
    filesize: {
        type: String,
        required: true,
        trim: true
    },
    links: {
        type: Array,
        required: true,
        trim: true
    },
    tut: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tutorial'
    },
    avatar: {
        type: Buffer,
        required: true
    }
}, {
    timestamps: true
})

courseSchema.methods.toJSON = function () {
    const course = this
    const courseObject = course.toObject()

    delete courseObject.tut
    delete courseObject.avatar

    return courseObject
}

courseSchema.plugin(uniqueValidator)

const Course = mongoose.model('Course', courseSchema)

module.exports = Course