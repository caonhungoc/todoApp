const express = require("express");

const router = express.Router();

const task_controller = require("./../controllers/task");
const auth = require("./../utils/auth");

router.use("/", auth.auth(), (req, res, next) => { // check permission
    // only basic can continue
    if(req.role && "basic" === req.role) {
        next();
    } else {
        res.send("Something wrong");
    }

});

// POST request to create a task
router.post('/', task_controller.task_create_post);

// GET request to get a task
router.get('/', task_controller.task_get_get);

// GET request to create a task
router.get('/all', task_controller.task_getall_get);

// PUT request to update a task
router.put('/update', task_controller.task_update_put);

// PUT request to delete a task
router.put('/remove', task_controller.task_remove_put); // remove task and can't re-open, change status to removed

// PUT request to re-open a task
router.put('/reopen', task_controller.task_reopen_put); // re-open task that was not removed, change status to re-open

// PUT request to close a task
router.put('/close', task_controller.task_close_put); // change status to close

module.exports = router;