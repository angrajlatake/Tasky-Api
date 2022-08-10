import express from "express";
import { login, register } from "../controller/auth.js";
import { deleteUser, updateUser, getAllUsers } from "../controller/users.js";
import { verifyUser, verifyAdmin, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/verifytoken", verifyToken, (req, res, next) => {
  res.send(`${req.user.id} is logged in`);
});
// update user
router.put("/:id", verifyUser, updateUser);
//delete user
router.delete("/:id", verifyUser, deleteUser);

//get all users
router.get("/", getAllUsers);

export default router;
