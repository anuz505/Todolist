const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(
    "why you lookin at my repository mate i haven't even finished it yet"
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
