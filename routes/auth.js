import express from "express";
import { login, refreshToken, register } from "../controller/auth.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refreshToken", verifyToken, refreshToken);
export default router;
