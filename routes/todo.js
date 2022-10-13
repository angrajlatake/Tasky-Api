import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controller/todo.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// post new todo
router.post("/:id", verifyUser, createTodo);
// edit todo
router.put("/:id", verifyUser, updateTodo);
//delete Todo
router.delete("/:id", verifyUser, deleteTodo);
// get Todo

router.get("/:id", verifyUser, getTodo);

export default router;
