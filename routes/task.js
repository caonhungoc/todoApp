const express = require("express");

const router = express.Router();

const task_controller = require("@controller/task");
const auth = require("@util/auth");

router.use("/", auth.auth(), (req, res, next) =>{
    // only basic can continue
    if(req.role && ("admin" === req.role || "basic" === req.role)) {
        next();
    } else {
        res.send("Something wrong");
    }
})

// GET request to get a task
router.get('/:statusID', task_controller.admin_alltask_get);

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
router.get('/:id', task_controller.task_get_get);

// GET request to create all task
router.get('/', task_controller.task_getall_get); 

// PUT request to update a task
router.put('/', task_controller.task_update_put);

// DELETE request to delete a task
router.delete('/:id', task_controller.task_remove_delete); // remove task and can't re-open, change status to removed

// PUT request to re-open a task
router.put('/reopen/:id', task_controller.task_reopen_put); // re-open task that was not removed, change status to re-open

// DELETE request to close a task
router.delete('/close/:id', task_controller.task_close_delete); // change status to close

module.exports = router;