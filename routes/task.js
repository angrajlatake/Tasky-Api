import express from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getAllProjectTask,
  getTask,
  updateTask,
  getUserTasks,
} from "../controller/task.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
//create task
router.post("/:id", verifyAdmin, createTask);
//update task
router.put("/:id", verifyUser, updateTask);
//delete task
router.delete("/:id/:projectId", verifyAdmin, deleteTask);
//get task
router.get("/:id", verifyUser, getTask);
// get all tasks
router.get("/", verifyAdmin, getAllTask);

// get tasks by project
router.get("/byproject/:id", verifyAdmin, getAllProjectTask);
//get all task for user
router.get("/user/:id", verifyUser, getUserTasks);

export default router;

//const records = await Model.find({ '_id': { $in: ids } });
