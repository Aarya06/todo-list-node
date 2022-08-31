const jwt = require('jsonwebtoken');

exports.signJwt = (id) => jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
})

exports.signJwtRefreshToken = (id) => jwt.sign({id}, process.env.REFRESH_TOKEN_SECRETE, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES
})

exports.verifyJwt = (token) => {
    try {
        const userId = jwt.verify(token, process.env.JWT_SECRET)
        return userId;
    } catch (error) {
        return null
    }
}

exports.verifyJwtRefreshToken = (token) => {
    try {
        const userId = jwt.verify(token, process.env.REFRESH_TOKEN_SECRETE)
        return userId;
    } catch (error) {
        return null
    }
}
