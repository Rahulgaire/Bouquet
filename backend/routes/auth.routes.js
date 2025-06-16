const express = require("express");
const authRouter = express.Router();

const {register,login ,logout} = require("../controllers/auth.controllers");

authRouter.post("/register-user", register);
authRouter.post("/login-user", login);
authRouter.get('/logout', logout);
module.exports = authRouter;