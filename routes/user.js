const express = require("express");

const router = express.Router();

// const user_controller = require("./../controllers/user");
const user_controller = require("@controller/user");
const auth = require("@util/auth");

// POST request to create a user
router.post('/', user_controller.user_create_post);

router.use("/", auth.auth(), (req, res, next) => { // check permission
    // only admin can continue
    if(req.role && "admin" === req.role) {
        next();
    } else {
        res.send("Something wrong");
    }

});

// GET request to get all user
router.get('/', user_controller.user_all_get);

module.exports = router;