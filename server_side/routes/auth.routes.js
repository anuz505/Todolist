const express = require("express");
const authRouter = express.Router();
const {
  post_signup,
  login_post,
  get_logout,
} = require("../controllers/auth.controller");
authRouter.post("/signup", post_signup);
authRouter.post("/login", login_post);
authRouter.get("/logout", get_logout);
module.exports = authRouter;
