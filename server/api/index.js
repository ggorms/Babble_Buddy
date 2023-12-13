const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/conversation", require("./conversation"));
router.use("/message", require("./message"));

module.exports = router;
