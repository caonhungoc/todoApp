const User = require("@model/user");
const { body,validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSignature = config.get('jwtSignature');

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

                    if(1 === foundUser[0].roleID) { // admin role
                        req.role = "admin";
                    } else if(2 === foundUser[0].roleID) { // basic role
                        req.role = "basic";
                    } else {
                        req.role = "unknown";
                    }
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
                    res.cookie('token', token, {
                        expires: new Date(Date.now() + 1000),
                        secure: false, // set to true if your using https
                        httpOnly: true,
                    }).send({
                        token, 
                        message : "login successfully",
                        userName: foundUser[0].name,
                        role: req.role
                    }); 
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