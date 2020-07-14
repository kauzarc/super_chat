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

function send_message(message) {
  io.sockets.emit("message", message);
  console.log("Message emited: " + message);
}

io.sockets.on("connection", function (socket) {
  console.log("Connection");

  socket.on("pseudo", function (pseudo) {
    socket.pseudo = pseudo;
    send_message(pseudo + " is connected");
  })

  socket.on("message", send_message);
});
