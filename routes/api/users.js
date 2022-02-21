const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken")
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/test", (req,res) => {
    res.json({msg: "this is the user rout"})
})

router.post("/register", (req,res) => {

    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors)
    }
    User.findOne({email: req.body.email})
    .then(user => {
        if (user) {
            return res.status(400).json({email: "user already exists in the database"})
        } else {
            const newUser =  new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password
            }) 

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            const payload = {
                                id: user.id,
                                email: user.email,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                email: user.email
                            }
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                { expiresIn: 86400 },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    })
                                }
                            )
                        })
                    .catch(err => console.log(err))
                })
            })
        }
    })
})

router.post("/login", (req, res) => {
    // debugger
    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user){
                return res.status(404).json({email : "this user does not exist"})
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch){
                        const payload = {
                            id: user.id,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email
                        }
                        jwt.sign(payload,
                            keys.secretOrKey,
                            { expiresIn: 86400 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            })
                        
                    } else {
                        return res.status(400).json({password: "incorrect password"})
                    } 
                })
        })
})

module.exports = router;