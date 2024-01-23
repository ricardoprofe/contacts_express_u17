const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Get config vars
dotenv.config();

let User = require(__dirname + '/../models/user.js');
let router = express.Router();

// Function to generate the tokens
let generateToken = login => {
    return jwt.sign({login: login}, process.env.TOKEN_SECRET, {expiresIn: "1 hours"});
};

//Register a new user
router.post('/register', (req, res) => {
    //Check the password length before cipher
    if(req.body.password.length < 8)
    {
        res.status(400)
            .send({ok: false, 
                error: "The password must have at least 8 characters"});
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            let newUser = new User({
                email: req.body.email,
                password: hash
            });
            newUser.save().then(result => {
                //Delete the password after saved
                newUser.password = "SECRET";
                res.status(200)
                .send({ok: true, result: result});
            }).catch(error => {
                res.status(400)
                .send({ok: false, error: error});
            });
      });
    }    
});

//Login
router.post('/login', (req, res) => {
    let plainPassword = req.body.password;
    let email = req.body.email;
    
    User.findOne({email: email})
    .then(result => {
        if(result) {           
            if ( bcrypt.compareSync(plainPassword, result.password) ){
                res.status(200)
                    .send({ok: true, token: generateToken(email)});
            } else {
                res.status(400)
                    .send({ok: false, error: "Wrong password"});
            }
        } else {
            res.status(400)
                    .send({ok: false, error: "User not found"});
        }
        
    })
    .catch(error => {
        res.status(400)
            .send({ok: false, error: "Login error: " + error});
    });
});

module.exports = router;