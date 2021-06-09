const e = require("express");
const express = require("express");

const router = express.Router();

const user_controller = require("./../controllers/user");
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
router.get('/', user_controller.admin_page_get);

module.exports = router;