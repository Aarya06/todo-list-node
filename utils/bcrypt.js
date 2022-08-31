const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => await bcrypt.hash(password, 12)
