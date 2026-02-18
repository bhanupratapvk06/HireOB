import express from "express";

import {
  userRegister,
  userLogin,
  deleteUser,
  fetchUser,
} from "../controllers/user.controller.js";

import {
  loginLimiter,
  registerLimiter,
} from "../middlewares/rateLimiter.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();


router.post("/register",registerLimiter,userRegister);
router.post("/login",loginLimiter,userLogin);
router.get("/me",authMiddleware,fetchUser);
router.delete('/',authMiddleware,deleteUser);

export default router;