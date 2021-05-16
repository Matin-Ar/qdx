const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
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
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('ایمیل وارد شده اشتباه میباشد')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value, {minLength: 8, minLowercase: 1, minUppercase: 0, minNumbers: 1, minSymbols: 0})) {
                throw new Error('پسورد وارد شده باید شامل حداقل 1 حرف کوچک و 1 عدد باشد.(حداقل تعداد کل کاراکتر ها 8)')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    },
    gender: {
        type: String
    },
    bday: {
        type: String,
        default: '{"day":1,"month":1,"year":1371}'
    },
    codinglanguage: {
        type: String
    },
    education: {
        type: String
    },
    role: {
        type: String,
        required: true,
        trim: true,
        default: 'User'
    },
    verify: {
        type: Boolean,
        required: true,
        trim: true,
        default: false
    }
}, {
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET )

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('ایمیل و یا رمز عبور شما اشتباه می باشد')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('ایمیل و یا رمز عبور شما اشتباه می باشد')
    }

    return user
} 

// Hashing password
userSchema.pre('save', async function (next) {
    const user = this
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User