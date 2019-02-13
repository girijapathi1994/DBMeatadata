const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken'); // accessing the json web tokens
const db = "mongodb://abc123:abc123@ds049945.mlab.com:49945/mdb"
const User = require("../models/user")
mongoose.connect(db, err => {
    if (err) {
        console.error("error" + err)
    } else {
        console.log("successful")
    }
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) { //condition if authorization not there
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1] //if there we will split by space where we will have token in the index1 because 0th index is bearer
    if (token === 'null') { // if token is null
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey') // verify methods decodes token and returns if matches else it wont return
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject //if success we add payload subject as request userid
    next() //pass on the execution to next handler
}
router.get('/getAllCollections', verifyToken, (req, res) => { //here verifytoken is middleware first token verified and next code is executed if not 401 from verifytoken
    mongoose.connection.db.listCollections().toArray((error, collections) => {
        if (error) {
            res.status(401).send("Error in fetching collections")
        } else {
            res.send(collections);
        }
    })

})
router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    //for saving user object
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            let payload = {
                subject: registeredUser._id
            } // creating payload with some user assigned data
            let token = jwt.sign(payload, 'secretKey') //assigning secret key for payload
            res.status(200).send({
                token
            })
        }
    })
})
router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({
        email: userData.email
    }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('Invalid Email')
            } else
            if (user.password !== userData.password) {
                res.status(401).send('Invalid Password')
            } else {
                let payload = {
                    subject: user._id
                }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({
                    token
                })
            }
        }
    })
})

module.exports = router;
