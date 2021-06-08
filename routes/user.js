const express = require("express");

const router = express.Router();

const user_controller = require("./../controllers/user");

// POST request for create a user
router.post('/create', user_controller.user_create_post);

// POST request for login
router.post('/login', user_controller.user_login_post);

module.exports = router;