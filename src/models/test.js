const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    test: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

testSchema.methods.toJSON = function () {
    const test = this
    const testObject = test.toObject()

    delete testObject._id
    delete testObject.__v
    return testObject
}

const Test = mongoose.model('Test', testSchema)

module.exports = Test