const Task = require('../models/Task');

const taskController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTaskById: async (req, res) => {
    const id = req.params.id;
    try {
      const task = await Task.findById(id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createTask: async (req, res) => {
    const { title, description, status, assignedTo, roomId } = req.body;
    const newTask = new Task({ title, description, status, assignedTo, roomId });
    try {
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateTask: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
      if (updatedTask) {
        res.json(updatedTask);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteTask: async (req, res) => {
    const id = req.params.id;
    try {
      const deletedTask = await Task.findByIdAndDelete(id);
      if (deletedTask) {
        res.json(deletedTask);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = taskController;
