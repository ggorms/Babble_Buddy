const express = require("express");
const router = express.Router();
const io = require("socket.io")(8081, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // On Connection
  console.log("a user has connected", socket.id);
  // take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
    console.log(users);
  });

  // Send and Get message
  socket.on("sendMessage", ({ senderId, receiverId, text, conversationId }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
      conversationId,
    });
  });

  socket.on("disconnect", () => {
    // On Disconnection
    console.log("a user disconnected", socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

module.exports = router;
