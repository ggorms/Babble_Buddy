const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/new", async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;

    const newConversation = await prisma.conversation.create();

    const newUserConversation__sender = await prisma.userConversation.create({
      data: {
        userId: senderId,
        conversationId: newConversation.id,
      },
    });

    const newUserConversation__receiver = await prisma.userConversation.create({
      data: {
        userId: receiverId,
        conversationId: newConversation.id,
      },
    });

    res.status(200).json(newConversation);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userConversations = await prisma.conversation.findMany({
      include: {
        UserConversation: {
          where: {
            userId: +id,
          },
        },
      },
    });
    res.status(200).json(userConversations);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
