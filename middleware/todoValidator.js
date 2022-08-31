const { body } = require('express-validator');

exports.add = () => [
    body('title', 'Please enter a valid title for todo')
        .not().isEmpty()
]
