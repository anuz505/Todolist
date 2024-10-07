const mongoose = require("mongoose");
const User = require("./user.model");
const taskSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
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
