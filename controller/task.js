import Project from "../models/project.js";
import Task from "../models/Task.js";
import { createError } from "../utils/error.js";

//create task
export const createTask = async (req, res, next) => {
  const newTask = new Task(req.body);
  try {
    const savedTask = await newTask.save();
    try {
      const foundProject = await Project.findByIdAndUpdate(
        req.params.id,
        {
          $push: { tasks: savedTask._id },
        },
        { new: true }
      );
      const foundTasks = await Task.find({ _id: { $in: foundProject.tasks } });
      res.status(200).json({
        message: "Task created",
        newTask: savedTask,
        projectTasks: foundTasks,
      });
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
    const foundTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!foundTask) {
      return next(createError(404, "Task not found"));
    }
    res.status(200).send(foundTask);
  } catch (err) {
    next(err);
  }
};
//delete task
export const deleteTask = async (req, res, next) => {
  try {
    const foundTask = await Task.findByIdAndDelete(req.params.id);
    if (!foundTask) {
      return next(createError(404, "Task not found"));
    }
    try {
      const foundProject = await Project.findByIdAndUpdate(
        req.params.projectId,
        {
          $pull: { tasks: foundTask._id },
        },
        { new: true }
      );

      res.status(200).json({
        message: "Task deleted",
      });
    } catch (err) {
      next(err);
    }
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
    const foundProject = await Project.find(
      {
        manager: req.user.id,
      },
      "tasks"
    );
    let taskID = [];
    foundProject.forEach((element) => (taskID = [...taskID, ...element.tasks]));
    const foundTasks = await Task.find({ _id: { $in: taskID } });
    res.status(200).json(foundTasks);
  } catch (err) {
    next(err);
  }
};
// get all Project tasks
export const getAllProjectTask = async (req, res, next) => {
  try {
    const foundProject = await Project.findById(req.params.id, "tasks");
    const foundTasks = await Task.find({ _id: { $in: foundProject.tasks } });
    res.status(200).json(foundTasks);
  } catch (err) {
    next(err);
  }
};

export const getUserTasks = async (req, res, next) => {
  try {
    const foundTasks = await Task.find({ assignedTo: req.params.id });
    if (foundTasks.length === 0) {
      return next(createError(404, "Tasks for user not found"));
    }
    res.status(200).json(foundTasks);
  } catch (err) {
    next(err);
  }
};
