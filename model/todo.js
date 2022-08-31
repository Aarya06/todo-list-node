const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    require: [true, 'Title is required']
  },
  status: {
    type: String,
    enum: {
      values: ['PENDING', 'COMPLETED'],
      message: '{VALUE} is not supported'
    },
    default: 'PENDING'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Todo', todoSchema)