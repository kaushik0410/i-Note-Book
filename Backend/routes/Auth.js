const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const User = require('../Models/User');
var fetchUser = require('../middleware/FetchUser');
const {body, validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtToken = 'qwertyUIOP@asdfgHJKL#zxcv$bnm';

//Sign Up user
router.post('/createUser', [
    body('name', 'Enter valid name').isLength({min: 3, max: 15}),
    body('email', 'Enter valid email id').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({min: 8})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        let success = false;
        return res.status(400).json({success, errors: errors.array()});
    }
    let user = await User.findOne({email: req.body.email});
    try {

        if (user) {
            let success = false;
            return res.status(400).json({success, error: "User with the same email already exists!!!"})
        }

        const salt = await bcryptjs.genSalt(10);
        const secKey = await bcryptjs.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secKey,
        });

        const data = {user: {id: user.id}};
        const authToken = jwt.sign(data, jwtToken);
        let success = true;
        res.json({success, authToken});

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

//Sign In user
router.post('/signin', [
    body('email', 'Enter valid email id').isEmail(),
    body('password', 'password can not be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        let success = false;
        return res.status(400).json({success, errors: errors.array()});
    }

    const {email, password} = req.body;
    try {

        let user = await User.findOne({email});
        if (!user) {
            let success = false;
            return res.status(400).json({success, error: "Invalid email/password, Kindly use valid email/password"});
        }

        const passwordCompare = bcryptjs.compare(password, user.password);
        if (!passwordCompare) {
            let success = false;
            return res.status(400).json({success, error: "Invalid email/password, Kindly use valid email/password"});
        }

        const data = {user: {id: user.id}};
        const authToken = jwt.sign(data, jwtToken);
        let success = true;
        res.json({success, authToken});
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

//Get deatils of user
router.post('/userDetails', fetchUser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        let success = true;
        res.send({success, user});
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;