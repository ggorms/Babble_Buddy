const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");

app.use(cors());

app.use("/", express.static(path.join(__dirname, "pulic")));

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

const server = app.listen(8080, () => {
  console.log("SERVER RUNNING ON PORT 8080");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
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
