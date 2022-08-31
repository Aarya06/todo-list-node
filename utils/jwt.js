const jwt = require('jsonwebtoken');

exports.signJwt = (id) => jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
})
