import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  updateProject,
} from "../controller/project.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//create project
router.post("/", verifyAdmin, createProject);
//update project
router.put("/:id", verifyAdmin, updateProject);

//delete project
router.delete("/:id", verifyAdmin, deleteProject);
//get project
router.get("/:id", verifyAdmin, getProject);
//get all projects
router.get("/", verifyAdmin, getAllProjects);

export default router;
