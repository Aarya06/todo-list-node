const { body } = require('express-validator');

exports.addOrUpdate = () => [
    body('title', 'Please enter a valid title for todo')
        .not().isEmpty()
]
