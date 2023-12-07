const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleUser = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
    res.status(200).json(singleUser);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
