const express = require('express');
const app = express();
const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post('/', async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        console.log("Session Controller: Invalid Email");

        return res.status(401).send({
            status: 401,
            message: "Invalid Email",

        });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
        console.log("Session Controller: Invalid Password");
        //unauthorised
        return res.status(401).send({
            status: 401,
            message: "Invalid Password",

        });
    }

    console.log("User is Log in: " + user);
    // encode jwt and send
    const token = jwt.sign({
        sub: user.email,
        role: user.type
    }, process.env.SECRET, { expiresIn: '60s', algorithm: 'HS256' });

    console.log('token generated:', token);
    return res.send({ token });
});

module.exports = app