const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fistName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Password is required']
    }
})

userSchema.post('save', (error, doc, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Email already exists!'));
    } else {
        next();
    }
});

module.exports = mongoose.model('User', userSchema)