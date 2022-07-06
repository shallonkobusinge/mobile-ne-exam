const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
Joi.objectId = require('joi-objectid')(Joi);
const pagination = require("mongoose-paginate-v2")


const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    nationalId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

UserSchema.plugin(pagination)


exports.User = mongoose.model("User", UserSchema);

//validate nationalId to be 16 digits using regex

//validate user,validate phone to be unique and 10 digits using regex
exports.validateUser = (user) => {
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        nationalId: Joi.string().regex(/^[0-9]{16}$/).required(),
        password: Joi.string(),
        phone: Joi.string().regex(/^[0-9]{10}$/).required(),
        address: Joi.string().required(),
    });
    return schema.validate(user);
}

exports.validateOwner = (user) => {
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        nationalId: Joi.string().regex(/^[0-9]{16}$/).required(),
        phone: Joi.string().regex(/^[0-9]{10}$/).required(),
        address: Joi.string().required(),
    });
    return schema.validate(user);
}
// validate login
exports.validateLogin = (login) => {
    const schema = Joi.object({
        iDOrPhone: Joi.string().required(),
        password: Joi.string().required(),
    });
    return schema.validate(login);
}

exports.generateToken = async (user) => {
    const token = jwt.sign({
        userId: user._id,
        firstName: user.fname,
        lastName: user.lname,
        nationalId: user.nationalId,
        isAdmin: user.isAdmin,
        phone: user.phone,
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '12h' }
    )
    return token;

}