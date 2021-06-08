const User = require("./../models/user");
const { body,validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSignature = config.get('jwtSignature');

exports.user_create_post = [
    // Validate and sanitise fields.
    body('email', 'email must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('password', 'password must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('user_type', 'user type must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        try {
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create a user object with escaped and trimmed data.
            if(errors.isEmpty()) {
                // check that is the email existed?
                let foundUser = await User.findOne({'email': req.body.email});

                if(!foundUser) {
                    let user = new User({ 
                        email: req.body.email,
                        password: req.body.password,
                        user_type: req.body.user_type,
                    });
            
                    // Data from form is valid. Save user.
                    await user.save();
                    return res.status(201).send(user._id);
                } else {
                    return res.send("user existed! choose another name!");
                }
            }
            else {
                res.send("Something wrong");
            }
        } catch(e) {
            console.log(e);
        }
    } 
];

exports.admin_page_get = function(req, res, next) {
    res.send("Admin page, normal user can't come here");
};

exports.user_login_post = [
    // Validate and sanitise fields.
    body('email', 'email must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('password', 'password must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        try {
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Find user with escaped and trimmed data.
            if(errors.isEmpty()) {
                let foundUser = await User.findOne({'email': req.body.email});

                if(foundUser) {
                    //
                    const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
                    if (!isMatch) {
                        return res.status(401).send({ message: "user not found!" });
                    }

                    //generate token
                    const token = await jwt.sign({
                        _id: foundUser._id,
                        email: foundUser.email
                    }, jwtSignature);

                    //send token for frontebd
                    //send result
                    res.send(token); 
                } else {
                    return res.send("user not found!");
                }
            }
            else {
                res.send("Something wrong");
            }
        } catch(e) {
            console.log(e);
        }
    } 
];