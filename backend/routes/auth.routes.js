import express from "express";

import {
  userRegister,
  userLogin,
  deleteUser,
} from "../controllers/user.controller.js";

import {
  loginLimiter,
  registerLimiter,
} from "../middlewares/rateLimiter.js";

const router = express.Router();


router.post("/register",registerLimiter,userRegister);
router.post("/login",loginLimiter,userLogin);
router.delete('/delete',deleteUser);

export default router;