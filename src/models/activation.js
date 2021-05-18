const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')

const activationSchema = new mongoose.Schema({
    number: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('شماره تلفن اشتباه می باشد')
            }
            if (value.length != 11) {
                throw new Error('شماره تلفن باید 11 رقمی باشد')
            }
        }
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

// Hashing password
activationSchema.pre('save', async function (next) {
    const user = this
    
    if (user.isModified('code')) {
        user.code = await bcrypt.hash(user.code, 8)
    }

    next()
})

activationSchema.plugin(uniqueValidator)

const Activation = mongoose.model('Activation', activationSchema)

module.exports = Activation