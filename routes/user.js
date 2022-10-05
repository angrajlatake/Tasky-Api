import express from "express";
import { login, register } from "../controller/auth.js";
import {
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
  getAllAdminUsers,
} from "../controller/users.js";
import { verifyUser, verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/verifytoken", verifyToken, (req, res, next) => {
  res.send(`${req.user.id} is logged in`);
});
// update user
router.put("/:id", verifyUser, updateUser);

//delete user
router.delete("/:id", verifyAdmin, deleteUser);
//get all admin users
router.get("/admin", verifyAdmin, getAllAdminUsers);
//get user by id
router.get("/:id", verifyAdmin, getUserById);

//get all users
router.get("/", verifyAdmin, getAllUsers);

export default router;
