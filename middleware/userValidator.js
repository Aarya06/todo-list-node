const { body } = require('express-validator');

exports.user = () => [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('password')
        .trim().custom(value => {
            var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
            const match = regularExpression.test(value)
            if (!match) {
                throw new Error('Please enter an alpha-numeric password of 8-16 characters');
            }
            return true
        })
]