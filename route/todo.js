const express = require('express');
const todoController = require('../controller/todo');
const router = express.Router()
const todoValidator = require('../middleware/todoValidator')

router.
    route('/')
    .get(todoController.getAllTodos)
    .post(todoValidator.addOrUpdate(), todoController.add)

router.
    route('/:id')
    .get(todoController.getTodo)
    .delete(todoController.deleteTodo)
    .put(todoValidator.addOrUpdate(), todoController.updateTodo)
    .patch(todoController.updateTodo)

module.exports = router;
