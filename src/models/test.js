const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const testSchema = new mongoose.Schema({
    test: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
})

testSchema.methods.toJSON = function () {
    const test = this
    const testObject = test.toObject()

    delete testObject._id
    delete testObject.__v
    return testObject
}


testSchema.plugin(uniqueValidator)


const Test = mongoose.model('Test', testSchema)

module.exports = Test