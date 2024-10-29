const express = require("express");
const authRouter = express.Router();
const {
  post_signup,
  login_post,
  post_logout,
} = require("../controllers/auth.controller");
authRouter.post("/signup", post_signup);
authRouter.post("/login", login_post);
authRouter.post("/logout", post_logout);
module.exports = authRouter;
