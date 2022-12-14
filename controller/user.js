const User = require('../model/user');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { signJwt, signJwtRefreshToken, verifyJwtRefreshToken } = require('../utils/jwt');
const { validationResult } = require('express-validator');

exports.signup = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({
                message: error.array()[0].msg,
            })
        }
        const { email, password, firstName, lastName } = req.body
        const exists = await User.findOne({ email });
        if(exists){
            return res.status(409).json({ message: 'Email already exists' })
        }
        const hashedPassword = await hashPassword(password);
        User.create({ email, password, firstName, lastName, password: hashedPassword }).then(user => {
            user.password = undefined;
            const accessToken = signJwt(user._id);
            const refreshToken = signJwtRefreshToken(user._id)
            res.status(201).json({
                user,
                token: {
                    accessToken,
                    refreshToken
                }
            })
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


exports.login = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({
                message: error.array()[0].msg,
            })
        }
        const { email, password } = req.body;
        User.findOne({ email }).then(async user => {
            if (!user) {
                return res.status(400).json({
                    msg: 'invalid email or password'
                })
            }
            const matched = await comparePassword(password, user.password);
            if (!matched) {
                return res.status(400).json({
                    msg: 'invalid email or password'
                })
            }
            user.password = undefined;
            const accessToken = signJwt(user._id);
            const refreshToken = signJwtRefreshToken(user._id)
            res.status(200).json({
                user,
                token: {
                    accessToken,
                    refreshToken
                }
            })
        }).catch(err => {
            res.status(400).json({
                msg: err.message
            })
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
}

exports.refreshToken = async(req, res, next) => {
    try {
        const { refreshToken: token } = req.body;
        if(!token){
            return res.status(400).json({
                msg: 'Invalid token'
            })
        }
        const currentUser = verifyJwtRefreshToken(token)
        if(!currentUser){
            return res.status(400).json({
                msg: 'Invalid token'
            })
        }
        const accessToken = signJwt(currentUser.id);
        const refreshToken = signJwtRefreshToken(currentUser.id)
        res.status(200).json({
            accessToken,
            refreshToken
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
}
