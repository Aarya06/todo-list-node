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
        const exists = await Todo.findOne({ title, status: 'PENDING' });
        if(exists){
            return res.status(409).json({ message: 'Todo already exists' })
        }
        Todo.create({ title }).then(todo => {
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
