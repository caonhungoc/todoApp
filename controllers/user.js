const User = require("@model/user");
const { body,validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSignature = config.get('jwtSignature');

exports.user_create_post = [
    // Validate and sanitise fields.
    body('name', 'name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('email', 'email must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('password', 'password must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        try {
            const { email, password, name } = req.body;
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create a user object with escaped and trimmed data.
            if(errors.isEmpty()) {
                // check that is this email existed?
                let foundUser = await User.user.findAll({
                    where: {
                        email: email
                    }
                });
                // SELECT * FROM USERs WHERE USERs.email = email;

                if(!foundUser[0]) {
                    // hash password
                    let hashPassword = await bcrypt.hash(password, 8);
                    let user = await User.user.create({ 
                        email: email,
                        password: hashPassword,
                        name: name
                    });

                    return res.send( {email: email});
                } else {
                    return res.send("user existed!");
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
    res.send("Admin page, basic user can't come here");
};

exports.user_login_post = [
    // Validate and sanitise fields.
    body('email', 'email must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('password', 'password must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        
        try {
            const { email, password } = req.body;
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Find user with escaped and trimmed data.
            if(errors.isEmpty()) {
                let foundUser = await User.user.findAll({
                    where: {
                        email: email
                    }
                });
                // SELECT * FROM USERs WHERE USERs.email = email;

                if(foundUser) {
                    //
                    const isMatch = await bcrypt.compare(password, foundUser[0].password);
                    if (!isMatch) {
                        return res.status(401).send({ message: "user not found!" });
                    }

                    //generate token
                    const token = await jwt.sign({
                        id: foundUser[0].id,
                        email: foundUser[0].email
                    }, jwtSignature);

                    //send token for frontend
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
            res.send("Something wrong");
        }
    } 
];