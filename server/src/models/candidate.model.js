const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
Joi.objectId = require('joi-objectid')(Joi);
const pagination = require("mongoose-paginate-v2")
//enum for candidate gender

const candidateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
    gender: {
        type: String,
        required: true
    },

    missionStatement: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    votes: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true,
})

candidateSchema.plugin(pagination)


exports.Candidate = mongoose.model("Candidate", candidateSchema);

//validate nationalId to be 16 digits using regex




//validate gender


exports.validateCandidate = (candidate) => {
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        nationalId: Joi.string().regex(/^[0-9]{16}$/).required(),
        missionStatement: Joi.string().required(),
        gender: Joi.string().required(),
        profilePicture: Joi.string(),
    })
    return schema.validate(candidate);
}
