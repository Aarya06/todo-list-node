const User = require("../model/user");
const { verifyJwt } = require("../utils/jwt");

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            msg: 'You are not authorized'
        })
    }
    const currentUser = verifyJwt(token);
    await User.findById(currentUser.id).then(user => {
        if (!user) {
            return res.status(401).json({
                msg: 'You are not authorized'
            })
        }
        req.user = user
    })
    next()
}