const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

categorySchema.virtual('tutorials', {
    ref: 'Tutorial',
    localField: '_id',
    foreignField: 'cat'
})


categorySchema.plugin(uniqueValidator)

const Category = mongoose.model('Category', categorySchema)

module.exports = Category