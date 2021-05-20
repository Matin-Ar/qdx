const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
//const User = require('../models/user')
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
    }
}, {
    timestamps: true
})

// activationSchema.statics.signup = async (number, email) => {
//     console.log(User)
//     console.log('hello')
//     const abc = await User.findOne({})
//     throw new Error(abc)
//     // if(!number) {
//     //     throw new Error('Provide number !')
//     // }
//     // const text = []
//     // const userNumber = await User.findOne({ number: '09024262561' })
//     // console.log(userNumber)
//     // const userEmail = await User.findOne({ email })
//     // if(userNumber) {
//     //     text.push('این شماره قبلا ثبت شده است !')
//     // }
//     // if(userEmail) {
//     //     text.push('این ایمیل قبلا ثبت شده است !')
//     // }
//     // if (userEmail || userEmail) {
//     //     throw new Error(text.toString())
//     // }
// } 

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