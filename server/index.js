const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");

app.use(cors());

app.use("/", express.static(path.join(__dirname, "pulic")));

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/socket", require("./socket"));

app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.listen(8080, () => {
  console.log("SERVER RUNNING ON PORT 8080");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
