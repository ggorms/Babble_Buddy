const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create new message
router.post("/new", async (req, res, next) => {
  try {
    const { text, conversationId, senderId } = req.body;
    const newMessage = await prisma.message.create({
      data: {
        text,
        conversationId,
        senderId,
        date: new Date(Date.now()),
      },
    });
    res.status(200).json(newMessage);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Get all messages belonging to a particular conversation
router.get("/:conversationId", async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const messages = await prisma.message.findMany({
      where: {
        conversationId: +conversationId,
      },
      include: {
        sender: true,
      },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
