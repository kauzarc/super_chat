const express = require("express");
const path = require("path");

const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(function (req, res, next) {
  res.redirect("/");
});

var server = app.listen(8080, function () {
  console.log("Listening on port 8080");
});

const io = require("socket.io").listen(server);

function send_message(message) {
  io.sockets.emit("message", message);
  console.log("Message emited from " + message.author + ": " + message.message);
}

io.sockets.on("connection", function (socket) {
  console.log("new connection");

  socket.on("pseudo", function (pseudo) {
    socket.pseudo = pseudo;
    send_message({ message: pseudo + " is connected", author: "server" });
  })

  socket.on("message", send_message);
});
