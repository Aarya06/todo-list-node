const User = require("../model/user");
const { verifyJwt } = require("../utils/jwt");

function unAuthorizedError(res) {
    return res.status(401).json({
        msg: 'You are not authorized'
    })
}

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return unAuthorizedError(res)
    }
    const currentUser = verifyJwt(token);
    if(!currentUser){
        return unAuthorizedError(res)
    }
    await User.findById(currentUser.id).then(user => {
        if (!user) {
            return unAuthorizedError(res)
        }
        req.user = user
    })
    next()
}
