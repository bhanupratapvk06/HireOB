const express = require("express");
const { userRegister, userLogin, deleteUser } = require("../controllers/user.controller.js");
const { loginLimiter, registerLimiter } = require("../middlewares/rateLimiter.js");

const router = express.Router();

router.post("/register",registerLimiter,userRegister);
router.post("/login",loginLimiter,userLogin);
router.delete('/delete',deleteUser);

module.exports = router;
