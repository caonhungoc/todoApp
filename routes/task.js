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

// POST request for create a task
router.post('/', task_controller.task_create_post);

// // GET request for create a task
// router.get('/', task_controller.task_get_get);

// // UPDATE request for create a task
// router.put('/', task_controller.task_update_put);

// // DELETE request for create a task
// router.delete('/', task_controller.task_delete_delete);

module.exports = router;