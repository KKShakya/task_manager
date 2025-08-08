const Task = require("../models/Tasks");

// GET all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    //check if task are present
    if(!tasks || tasks.length==0){
      res.status(200).json({message:"NO task found"});
      return;
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
