const express = require("express");
const router = express.Router();
const {
  GetTasks,
  AddTask,
  GetsingleTask,
  UpdateTask,
  DeleteTask,
} = require("../controllers/tasks.controller.js");
router.get("/", GetTasks);
router.get("/:id", GetsingleTask);
router.post("/", AddTask);
router.put("/:id", UpdateTask);
router.delete("/:id", DeleteTask);

module.exports = router;
