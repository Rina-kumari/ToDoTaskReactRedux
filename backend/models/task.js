import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
        type: String, 
        required: true, 
        trim: true
    },
    description: { 
        type: String, 
        trim: true 
    },
    status: {
      type: String,
      enum: ['todo','pending', 'in-progress', 'completed'],
      default: 'todo',
    },
  }, { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;