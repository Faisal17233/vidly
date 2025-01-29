//const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();// instead of app we use router, because we are sending it to another file

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('no email found');

    
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('invalid password');

    const token = user.generateAuthToken();// jwtPrivateKey is the private key, which is used to create a jwttoken's signature, we will get it from environment variable
    res.send(token);
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
}


module.exports = router;