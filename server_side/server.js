const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/task.routes.js");
const cors = require("cors");
const authRouter = require("./routes/auth.routes.js");
const cookieParser = require("cookie-parser");
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend domain
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/tasks", taskRoutes);
app.use(authRouter);
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
      console.log(`The Server is running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
startServer();
