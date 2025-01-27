const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    // { _id: this._id } is the payload(whatever info we send to user)
    const token = jwt.sign({_id: this._id,isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));// jwtPrivateKey is the private key, which is used to create a jwttoken, we will get it from environment variable
    return token;
}

const User = mongoose.model('User', userSchema); // Use `model()` instead of `Model()`

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
