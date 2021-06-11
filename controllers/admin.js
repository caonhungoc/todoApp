const User = require("./../models/user");
const { body,validationResult, buildCheckFunction  } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Task = require('./../models/task');

const checkBodyAndQuery = buildCheckFunction(['body', 'query']);


exports.admin_page_get = function(req, res, next) {
    res.send("Admin page, basic user can't come here");
};

exports.admin_alluser_get = [

    // Process request after validation and sanitization.
    async (req, res, next) => {
        try {
        // Find user with escaped and trimmed data.
            let foundUser = await User.user.findAll({
                attributes: ['name', 'email', 'id'],
                where: {
                    roleID: 2
                }
            });

            if(foundUser[0]) {

                //send token for frontend
                //send result
                res.send(foundUser); 
            } else {
                return res.send("user not found!");
            }
        } catch(e) {
            console.log(e);
            res.send("Something wrong");
        }
    } 
];

exports.admin_alltask_get = [
    checkBodyAndQuery('statusID').trim().isLength({ min: 1 }).escape(),
    // Process request after validation and sanitization.
    async (req, res, next) => {
        
        try {
            // const errors = validationResult(req);
            // Find user with escaped and trimmed data.
            // if(errors.isEmpty()) {
                let foundTask = await Task.task.findAll({
                    where: {
                        statusID: req.params.statusID
                    }
                });

                if(foundTask[0]) {
                    //send result
                    res.send(foundTask); 
                } else {
                    return res.send("task not found!");
                }
            // }
            // else {
            //     res.send("Something wrong0");
            // }
        } catch(e) {
            console.log(e);
            res.send("Something wrong 1");
        }
    } 
];



