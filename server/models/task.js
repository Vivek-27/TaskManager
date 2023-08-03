const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  deadlineDate: {
    type: String
  },
  deadlineTime: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  color: {
    type: String
  },
  taskBy: {
    type: ObjectId,
    ref: 'User'
  }
});

mongoose.model('Task', taskSchema);
