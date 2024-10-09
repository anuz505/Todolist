const express = require("express");
const router = express.Router();
const {
  requireAuth,
  addUserToBody,
} = require("../middleware/authmiddlware.js");
const {
  GetTasks,
  AddTask,
  GetsingleTask,
  UpdateTask,
  DeleteTask,
} = require("../controllers/tasks.controller.js");
router.get("/", requireAuth, GetTasks);
router.get("/:id", requireAuth, GetsingleTask);
router.post("/", requireAuth, addUserToBody, AddTask);
router.put("/:id", requireAuth, UpdateTask);
router.delete("/:id", requireAuth, DeleteTask);

module.exports = router;
