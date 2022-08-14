import express from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTask,
  updateTask,
} from "../controller/task.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
//create task
router.post("/:projectId", verifyAdmin, createTask);
//update task
router.put("/:id", verifyUser, updateTask);
//delete task
router.delete("/:id/:projectId", verifyAdmin, deleteTask);
//get task
router.get("/:id", verifyUser, getTask);
// get all tasks
router.get("/", verifyUser, getAllTask);

export default router;
