const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/task.routes.js");
const cors = require("cors");
const authRouter = require("./routes/auth.routes.js");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authmiddlware.js");
dotenv.config();
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "https://todolist-delta-dusky.vercel.app", // Replace with your frontend domain
    methods: ["POST", "GET"], // Corrected syntax
    credentials: true,
  })
);

app.use("/tasks", taskRoutes);
app.use(authRouter);
app.get("/check-auth", requireAuth, (req, res) => {
  res.status(200).json({ message: "Authenticated" });
});
async function startServer() {
  try {
    await mongoose.connect(process.env.ConnectionString);
    console.log("The server is connected to the database");
    app.listen(process.env.PORT, () => {
      console.log(`The Server is running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
startServer();
