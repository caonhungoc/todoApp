const e = require("express");
const express = require("express");

const router = express.Router();

const admin_controller = require("./../controllers/admin");
const auth = require("./../utils/auth");

router.use("/", auth.auth(), (req, res, next) => { // check permission
    // only admin can coninue
    if(req.role && "admin" === req.role) {
        next();
    } else {
        res.send("Something wrong");
    }

});

// GET request for get info for admin
router.get('/', admin_controller.admin_page_get);

// GET request for get all users
router.get('/all-user', admin_controller.admin_alluser_get);

// GET request for get all task by status
router.get('/all-task/:statusID', admin_controller.admin_alltask_get);

module.exports = router;