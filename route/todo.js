const express = require('express');
const todoController = require('../controller/todo');
const router = express.Router()
const todoValidator = require('../middleware/todoValidator')

router.
    route('/add').
    post(todoValidator.add(), todoController.add)

module.exports = router;
