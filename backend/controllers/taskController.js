const Task = require("../models/Tasks");

// GET all tasks for logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user._id+"" });

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({ tasks: [], message: "No task found" });
    }

    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new task for logged-in user
exports.createTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      user_id: req.user._id+"", 
    };

    const task = await Task.create(taskData);

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE task only if it belongs to logged-in user
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user_id: req.user._id+"" });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user_id: req.user._id+"" });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }
      if ("completed" in req.body) {
      task.completed = req.body.completed;
    }
    if ("title" in req.body) {
      if (typeof req.body.title !== "string" || !req.body.title.trim()) {
        return res.status(400).json({ message: "Invalid title" });
      }
      task.title = req.body.title.trim();
    }
    await task.save();

    res.json({ message: "Task status updated succesfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
