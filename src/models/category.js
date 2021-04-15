const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category