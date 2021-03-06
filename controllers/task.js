const User = require("@model/user");
const Task = require('@model/task');
const { Op } = require("sequelize");
const { body,validationResult, buildCheckFunction, param, query } = require("express-validator");
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);
exports.task_create_post = [
    // Validate and sanitise fields.
    body('title', 'name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('description', 'description must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        try {
            const { title, description } = req.body;
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create a user object with escaped and trimmed data.
            if(errors.isEmpty()) {
                // check that is this user in db? 
                let foundUser = await User.user.findAll({
                    where: {
                        id: req.user.id
                    }
                });

                if(foundUser[0]) {
                    // need get statusID from DB
                    let taskData = {
                        title: title,
                        userID: req.user.id,
                        description: description,
                        createdDate: Date.now() 
                    }
                    await Task.task.create({ 
                        title: title,
                        userID: req.user.id,
                        description: description,
                        createdDate: Date.now() 
                    });

                    return res.send( {data: taskData});
                } else {
                    return res.send("user not found!");
                }
            }
            else {
                res.send("Something wrong");
            }
        } catch(e) {
            console.log(e);
            return res.send("something wrong!");
        }
    } 
];

exports.task_get_get = [
    // Validate and sanitise fields.
    // body('id', 'email must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        
        try {
            const { id } = req.params.id;
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Find user with escaped and trimmed data.
            if(errors.isEmpty()) {
                let foundTask = await Task.task.findAll({
                    where: {
                        id: id,
                        userID: req.user.id
                    }
                });

                if(foundTask[0]) {
                    //send result
                    res.send(foundTask[0]); 
                } else {
                    return res.send("task not found!");
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

exports.admin_alltask_get = [ // must have admin right to access
    param('statusID').trim().isLength({ min: 1 }).escape(),
    query('page', 'page must be number, must not be empty').trim().isLength({ min: 1 }).isNumeric().escape(),
    // Process request after validation and sanitization.
    async (req, res, next) => {
        if("admin" === req.role) {
            try {
                const offset = req.query.page;
                let foundTask = await Task.task.findAll({
                    where: {
                        statusID: req.params.statusID
                    },
                    offset: (offset-1)*10, 
                    limit: 10 
                });
    
                const amount = await Task.task.count({
                    where: {
                        statusID: req.params.statusID
                    }
                });

                if(foundTask[0]) {
                    //send result
                    res.send({
                        foundTask,
                        amount
                    }); 
                } else {
                    return res.send({message: "task not found!"});
                }
            } catch(e) {
                console.log(e);
                res.send({message: "Something wrong 1"});
            }
        }
        else {
            next();
        }
    } 
];

exports.task_getall_get = [
    // Process request after validation and sanitization.
    async (req, res, next) => {
        
        try {
            // const { id } = req.body;
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Find user with escaped and trimmed data.
            if(errors.isEmpty()) {
                let foundTask = await Task.task.findAll({
                    where: {
                        userID: req.user.id,
                        statusID: {
                            [Op.ne]: [Task.REMOVED_STATUS]
                        }
                    }
                });

                if(foundTask[0]) {
                    //send result
                    res.send(foundTask); 
                } else {
                    return res.send({message: "task not found!"});
                }
            }
            else {
                res.send({message: "Something wrong"});
            }
        } catch(e) {
            console.log(e);
            res.send({message: "Something wrong"});
        }
    } 
];

exports.task_update_put = [
    // Validate and sanitise fields.
    body('title', 'name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('description', 'description must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('id', 'email must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        
        try {
            const { title, description, id } = req.body;
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Find user with escaped and trimmed data.
            if(errors.isEmpty()) {
                let foundTask = await Task.task.findAll({
                    where: {
                        id: id,
                        userID: req.user.id,
                        statusID: {
                            [Op.ne]: [Task.task.REMOVED_STATUS]
                        }
                    }
                });

                if(foundTask[0]) {
                    // update task
                    await Task.task.update({ 
                        title: title, 
                        description:description 
                    }, {
                        where: {
                            id: id,
                            userID: req.user.id
                        }
                    });
                    res.send("update successfully"); 
                } else {
                    return res.send("task not found!");
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

exports.task_remove_delete = [
    // Validate and sanitise fields.
    param('id', 'id must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        
        try {
            const { id } = req.params;
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Find task with escaped and trimmed data.
            if(errors.isEmpty()) {
                let foundTask = await Task.task.findAll({
                    where: {
                        id: id,
                        userID: req.user.id
                    }
                });

                if(foundTask[0] && Task.REMOVED_STATUS !== foundTask[0].statusID) {
                    // change status of this task to close status
                    await Task.task.update({ 
                        statusID: Task.REMOVED_STATUS
                    }, {
                        where: {
                            id: id,
                            userID: req.user.id
                        }
                    });
                    res.send({message: "remove successfully"}); 
                } else {
                    return res.send({message: "task not found!"});
                }
            }
            else {
                res.send({message: "Something wrong"});
            }
        } catch(e) {
            console.log(e);
            res.send({message: "Something wrong"});
        }
    } 
];

exports.task_reopen_put = [
    // Validate and sanitise fields.
    param('id', 'id must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        
        try {
            const { id } = req.params;
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Find task with escaped and trimmed data.
            if(errors.isEmpty()) {
                let foundTask = await Task.task.findAll({
                    where: {
                        id: id,
                        userID: req.user.id
                    }
                });

                if(foundTask[0] && Task.CLOSE_STATUS === foundTask[0].statusID) {
                    // change status of this task to close status
                    await Task.task.update({ 
                        statusID: Task.RE_OPEN_STATUS
                    }, {
                        where: {
                            id: id,
                            userID: req.user.id
                        }
                    });
                    res.send({message: "re-open successfully"}); 
                } else {
                    return res.send({message: "task not found!"});
                }
            }
            else {
                res.send({message:"Something wrong"});
            }
        } catch(e) {
            console.log(e);
            res.send({message:"Something wrong"});
        }
    } 
];

exports.task_close_delete = [
    // Validate and sanitise fields.
    param('id', 'id must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        
        try {
            const { id } = req.params;
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Find task with escaped and trimmed data.
            if(errors.isEmpty()) {
                let foundTask = await Task.task.findAll({
                    where: {
                        id: id,
                        userID: req.user.id
                    }
                });

                if(foundTask[0] && (Task.OPEN_STATUS === foundTask[0].statusID || Task.RE_OPEN_STATUS === foundTask[0].statusID )) {
                    // change status of this task to close status
                    await Task.task.update({ 
                        statusID: Task.CLOSE_STATUS
                    }, {
                        where: {
                            id: id,
                            userID: req.user.id
                        }
                    });
                    res.send({message: "closed successfully"}); 
                } else {
                    return res.send({message: "task not found!"});
                }
            }
            else {
                res.send({message: "Something wrong"});
            }
        } catch(e) {
            console.log(e);
            res.send({message: "Something wrong"});
        }
    } 
];