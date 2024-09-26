const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["incomplete", "complete"],
    default: "incomplete",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
