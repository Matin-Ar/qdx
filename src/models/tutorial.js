const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const tutorialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    cat: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
}, {
    timestamps: true
})


tutorialSchema.plugin(uniqueValidator)

const Tutorial = mongoose.model('Tutorial', tutorialSchema)

module.exports = Tutorial