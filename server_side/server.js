const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
app.get("/", (req, res) => {
  res.send(
    "why you lookin at my repository mate i haven't even finished it yet"
  );
});

async function startServer() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Todolist");
    console.log("The server is connected to the database");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(error.message);
  }
}
startServer();
