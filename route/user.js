const express = require('express');
const userController = require('../controller/user');
const router = express.Router()
const userValidator = require('../middleware/userValidator')

router.
    route('/signup').
    post(userValidator.signup(), userController.signup)

router.
    route('/login').
    post(userValidator.login(), userController.login)

router.
    route('/refresh').post(userController.refreshToken)

module.exports = router;
