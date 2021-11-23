const { request } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const router = express.Router();

const userSchema = require('../../models/userSchema.js');

if (process.env.NODE_ENV !== "production") {
    const dotenv = require("dotenv");

    const result = dotenv.config();

    if (result.error){
        throw result.error;
    }
}


const url = process.env.mongoURL;
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => console.log("Database connected!"))
.catch(err =>console.log(err));

const User = mongoose.model('User', userSchema, 'users');

// Get Users
router.get('/', async (req, res) => {
    res.send(await User.find({}));
});

// Add User
router.post('/', async (req, res) => {
    try {
        const user = new User();
        user.userName = req.body.userName;
        await user.save(function(err,deck){
            if (err) {
                res.status(500);
            }
            res.status(201).json(deck);
        });
    } catch (err) {
         console.log(err)
    }
    
});

module.exports = router;