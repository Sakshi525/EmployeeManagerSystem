const express = require('express');
const session = require('express-session');
require('dotenv').config()
const User = require('../models/user-model')
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const secretToken = process.env.SECRET_TOKEN
app.use(express.json());

app.use(session({ secret: 'testing', resave: false, saveUninitialized: true, cookie: { secure: true } }));

exports.signUp = async (req, res) => {
    try {
        const { email, password, firstName, lastName, gender, hobbies, isManager } = req.body;
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            res.send("Email already exists")
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                hobbies: hobbies.split(','),
                isManager: isManager
            });
            await newUser.save();
            console.log('newUser --->', newUser);
            res.send("User signed up successfully");
        }
    } catch (error) {
        console.error(error);
        res.send('Error in sign-up');
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && bcrypt.compare(password, user.password)) {
            const token = jwt.sign(user, secretToken, )
            console.log('token', token)
            res.send({msg :' login succcessfully', token});
        } else {
            res.send('Invalid login credentials');
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Internal Server Error');
    }
}

