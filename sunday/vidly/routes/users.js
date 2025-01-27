const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const {User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();// instead of app we use router, because we are sending it to another file

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);    

    await user.save();

    // when a user creates an account, we want to log them in, so we will send a jwt token
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
        id: user._id,
        name: user.name,
        email: user.email
    });

    // use this send if after creating a acc, you want the user to login again
    // res.send({
    //     id: user._id,
    //     name: user.name,
    //     email: user.email
    // });
});

// first check authorization and then get the user
router.get('/me',auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

module.exports = router;