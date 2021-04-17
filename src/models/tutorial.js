const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const tutorialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    cat: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
}, {
    timestamps: true
})

tutorialSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'tut'
})

tutorialSchema.methods.toJSON = function () {
    const tutorial = this
    const tutorialObject = tutorial.toObject()

    delete tutorialObject.cat

    return tutorialObject
}


tutorialSchema.plugin(uniqueValidator)

const Tutorial = mongoose.model('Tutorial', tutorialSchema)

module.exports = Tutorial