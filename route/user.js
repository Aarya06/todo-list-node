const express = require('express');
const userController = require('../controller/user');
const router = express.Router()
const userValidator = require('../middleware/userValidator')

router.
    route('/signup').
    post(userValidator.user(), userController.signup)

module.exports = router;