import Project from "../models/project.js";
import Task from "../models/Task.js";
import { createError } from "../utils/error.js";

//create task
export const createTask = async (req, res, next) => {
  const newTask = new Task(req.body);
  try {
    const savedTask = await newTask.save();
    try {
      await Project.findByIdAndUpdate(req.params.projectId, {
        $push: { tasks: savedTask._id },
      });
      res.status(200).json({ message: "Task created" });
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
//update task
export const updateTask = async (req, res, next) => {
  try {
    const foundTask = Task.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!foundTask) {
      return next(createError(404, "Task not found"));
    }
    res.status(200).json({ message: "Task updated" });
  } catch (err) {
    next(err);
  }
};
//delete task
export const deleteTask = async (req, res, next) => {
  try {
    const foundTask = Task.findByIdAndDelete(req.params.id);
    if (!foundTask) {
      return next(createError(404, "Task not found"));
    }
    try {
      await Project.findByIdAndUpdate(req.params.projectId, {
        $pull: { tasks: foundTask._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
//get task
export const getTask = async (req, res, next) => {
  try {
    const foundTask = await Task.findById(req.params.id);
    if (!foundTask) {
      return next(createError(404, "Task not found"));
    }
    res.status(200).json([foundTask]);
  } catch (err) {
    next(err);
  }
};
// get all tasks
export const getAllTask = async (req, res, next) => {
  try {
    const foundTasks = await Task.find({});
    res.status(200).json(foundTasks);
  } catch (err) {
    next(err);
  }
};

export const getUserTasks = async (req, res, next) => {
  try {
    const foundTasks = await Task.find({ assignedTo: req.params.id });
    res.status(200).json(foundTasks);
  } catch (err) {
    next(err);
  }
};
