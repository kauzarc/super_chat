const express = require("express");
const path = require("path");

const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

var server = app.listen(8080, function () {
  console.log("Listening on port 8080");
});

const io = require("socket.io").listen(server);

io.sockets.on("connection", function (socket) {
  console.log("Connection");

  socket.on("pseudo", function (pseudo) {
    socket.pseudo = pseudo;
    console.log(pseudo + " logged");
  })
});
