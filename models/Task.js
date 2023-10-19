
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['todo', 'inprogress', 'done'], default: 'todo' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' }, 
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
