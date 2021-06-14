const express = require("express");

const router = express.Router();

const authen_controller = require("@controller/authen");

// POST request for login
router.post('/', authen_controller.user_login_post);

module.exports = router;