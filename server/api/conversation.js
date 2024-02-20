const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create new conversation
router.post("/new", async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;

    await prisma.$executeRaw`
    SELECT setval((
        SELECT PG_GET_SERIAL_SEQUENCE('"Conversation"', 'id')),
        (SELECT (MAX("id") + 1) FROM "Conversation"),
        false) FROM "Conversation"`;

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

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: newConversation.id,
      },
      include: {
        UserConversation: true,
      },
    });

    res.status(200).json(conversation);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// Get all conversations user is apart of
router.get("/:id", async (req, res, next) => {
  try {
    // userId from request
    const { id } = req.params;
    // Find all conversations the user is apart of
    const conversations = await prisma.userConversation.findMany({
      where: {
        userId: +id,
      },
    });

    const convoMembers = await prisma.conversation.findMany({
      where: {
        id: { in: conversations.map((convo) => convo.conversationId) },
      },
      include: {
        UserConversation: {
          include: {
            user: true,
          },
        },
      },
    });

    const convos = convoMembers.map((convo) => ({
      id: convo.id,
      members: convo.UserConversation.map((userConvo) => ({
        userId: userConvo.user.id,
        fName: userConvo.user.fName,
        lName: userConvo.user.lName,
      })),
    }));

    res.status(200).json(convos);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// Get conversation based on two users

router.get("/find/:userId/:friendId", async (req, res, next) => {
  const { userId, friendId } = req.params;
  // Find conversations the user is apart of
  try {
    const userConversations = await prisma.userConversation.findMany({
      where: {
        userId: +userId,
      },
    });

    // Find the conversation that the friend is also apart of

    const conversation = await prisma.conversation.findFirst({
      where: {
        UserConversation: {
          some: {
            userId: +friendId,
            conversationId: {
              in: userConversations.map(
                (userConvo) => userConvo.conversationId
              ),
            },
          },
        },
      },
      include: {
        UserConversation: true,
      },
    });

    res.status(200).json(conversation);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
