const express = require("express");
const { UserRegister, UserLogin } = require("../controllers/user.controller.js");
const { loginLimiter, registerLimiter } = require("../middlewares/rateLimiter.js");

const router = express.Router();

router.post("/register",registerLimiter,UserRegister);
router.post("/login",loginLimiter,UserLogin);

module.exports = router;
