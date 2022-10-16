import Project from "../models/project.js";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const createProject = async (req, res, next) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();

    try {
      const foundProject = await Project.find({
        manager: req.user.id,
      });
      const { title, ...otherDetails } = foundProject;

      res
        .status(200)
        .json({ message: "Project Created", projects: foundProject });
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
export const updateProject = async (req, res, next) => {
  try {
    const foundProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!foundProject) {
      return next(createError(404, "Project not found"));
    }
    res.status(201).json(foundProject);
  } catch (err) {
    next(err);
  }
};
export const deleteProject = async (req, res, next) => {
  try {
    const foundProject = await Project.findByIdAndDelete(req.params.id);
    if (!foundProject) {
      return next(createError(404, "Project not found"));
    }
    res.status(200).json({
      message: `${foundProject.title} project is successfully deleted`,
    });
  } catch (err) {
    next(err);
  }
};
export const getProject = async (req, res, next) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    if (!foundProject) {
      return next(createError(404, "Project not found"));
    }
    res.status(200).json(foundProject);
  } catch (err) {
    next(err);
  }
};
export const getAllUserProjects = async (req, res, next) => {
  try {
    const foundProject = await Project.find({
      manager: req.user.id,
    });
    const { title, ...otherDetails } = foundProject;
    res.status(200).json(foundProject);
  } catch (err) {
    next(err);
  }
};
export const getAllProjects = async (req, res, next) => {
  try {
    const foundProject = await Project.find({});
    const { title, ...otherDetails } = foundProject;
    res.status(200).json(foundProject);
  } catch (err) {
    next(err);
  }
};
