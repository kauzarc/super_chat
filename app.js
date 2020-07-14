const express = require("express");
const path = require("path");

const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(8080, function () {
  console.log("Listening on port 8080");
});

const io = require("socket.io");
