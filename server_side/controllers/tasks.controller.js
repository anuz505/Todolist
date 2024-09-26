const Task = require("../models/tasks.model.js");

async function GetTasks(req, res) {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function AddTask(req, res) {
  try {
    const tasks = await Task.create(req.body);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function GetsingleTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function UpdateTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);
    if (!task) {
      res.status(404).json({ message: "There is no task that has this id" });
    }
    const updatedTask = await Task.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function DeleteTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id, req.body);
    if (!task) {
      res.status(404).json({ message: "There is no task that has this id" });
    }
    res.status(200).json({ message: "The task is deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  GetTasks,
  AddTask,
  GetsingleTask,
  UpdateTask,
  DeleteTask,
};
