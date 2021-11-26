const { request } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const router = express.Router();

const userSchema = require('../../models/userSchema.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
router.post('/login', async (req, res) => {
    const userNameToBeFound = req.body.userName;
    const myPlaintextPassword = req.body.userPassword;

    const user  = User.where({ userName:userNameToBeFound });
    user.findOne(function (err, user) {
        if (!user){
            // The user couldn't be found
            res.sendStatus(202);
            return;
        }
        if (user) {
            bcrypt.compare(myPlaintextPassword, user.userPassword, function(err, result) {
                if (err) {
                    console.log("error comparing password:",err);
                }
                if (result) {
                    res.send(user);
                    return;
                } else{
                    res.sendStatus(205);
                    return;
                }
            });
        }
    });
});

// Get User after page reload
router.get('/:id', async (req, res) => {
    res.send(await User.findOne({_id:mongoose.Types.ObjectId(req.params.id)}));
});

// Add User
router.post('/', async (req, res) => {
    try {
        const userNameToBeFound = req.body.userName;
        const user  = User.where({ userName:userNameToBeFound });
        user.findOne(function (err, user) {
        if (!user){
            // The userName doesn't yet exist
            const user = new User();
            user.userName = req.body.userName;
            const myPlaintextPassword = req.body.userPassword;
            bcrypt.hash(myPlaintextPassword, saltRounds, async function(err, hash) {
            if (err) {
                console.log("error hashing password:",err);
            }
            user.userPassword = hash;
            await user.save(function(err,user){
                if (err) {
                    res.status(500);
                }
                res.status(201).json(user);
            });
        });
            return;
        }
        if (user) {
            // The userName is already taken
            res.sendStatus(205);
            return;
        }
    });
    } catch (err) {
         console.log(err)
    }
    
});

module.exports = router;