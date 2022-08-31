const Todo = require('../model/todo');
const { validationResult } = require('express-validator');

exports.add = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({
                message: error.array()[0].msg,
            })
        }
        const { title } = req.body
        Todo.create({ title, user: req.user }).then(todo => {
            res.status(201).json(todo)
        }).catch(err => {
            res.status(400).json({
                message: err.message,
            })

        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.getAllTodos = async (req, res, next) => {
    try {
        Todo.find({ user: req.user._id }).then(todo => {
            res.status(200).json(todo)
        }).catch(err => {
            res.status(400).json({
                message: err.message,
            })

        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.getTodo = async (req, res, next) => {
    try {
        Todo.findOne({ _id: req.params.id, user: req.user._id }).populate('user').then(todo => {
            if (!todo) {
                return res.status(404).json({
                    message: 'Todo does not exist',
                })
            }
            res.status(200).json(todo)
        }).catch(err => {
            res.status(400).json({
                message: err.message,
            })

        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id })
        if (!todo) {
            return res.status(404).json({
                message: 'Todo does not exist',
            })
        }
        Todo.findByIdAndDelete(req.params.id).then(() => {
            res.status(204).json({ message: 'deleted' })
        }).catch(err => {
            res.status(400).json({
                message: err.message,
            })

        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.updateTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id })
        if (!todo) {
            return res.status(404).json({
                message: 'Todo does not exist',
            })
        }
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({
                message: error.array()[0].msg,
            })
        }
        const { title, status } = req.body
        Todo.findByIdAndUpdate(req.params.id, { title, status }, { new: true }).then(todo => {
            res.status(200).json(todo)
        }).catch(err => {
            res.status(400).json({
                message: err.message,
            })

        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}
