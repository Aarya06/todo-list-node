const express = require('express');
const todoController = require('../controller/todo');
const router = express.Router()
const todoValidator = require('../middleware/todoValidator')
const isAuthenticated = require('../middleware/isAuthenticated')

router.
    route('/')
    .get(isAuthenticated, todoController.getAllTodos)
    .post(isAuthenticated, todoValidator.addOrUpdate(), todoController.add)

router.
    route('/:id')
    .get(isAuthenticated, todoController.getTodo)
    .delete(isAuthenticated, todoController.deleteTodo)
    .put(isAuthenticated, todoValidator.addOrUpdate(), todoController.updateTodo)
    .patch(isAuthenticated, todoController.updateTodo)

module.exports = router;
