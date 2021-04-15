const mongoose = require('mongoose')

const tutorialSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    subset: {
        type: String,
        required: true,
        ref: 'Category'
    }
}, {
    timestamps: true
})

const Tutorial = mongoose.model('Tutorial', tutorialSchema)

module.exports = Tutorial