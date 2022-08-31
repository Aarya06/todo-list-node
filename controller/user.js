const User = require('../model/user');
const { hashPassword, } = require('../utils/bcrypt');
const { signJwt } = require('../utils/jwt');
const { validationResult } = require('express-validator');

exports.signup = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({
                message: error.array()[0].msg,
            })
        }
        const exists = await User.findOne({ email: req.body.email });
        if(exists){
            return res.status(409).json({ message: 'Email already exists' })
        }
        const hashedPassword = await hashPassword(req.body.password);
        User.create({ ...req.body, password: hashedPassword }).then(user => {
            user.password = undefined;
            const accessToken = signJwt(user._id);
            res.status(201).json({
                user,
                token: {
                    accessToken
                }
            })
        }).catch(err => {
            res.status(401).json({
                message: err.message,
            })

        })

    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}
