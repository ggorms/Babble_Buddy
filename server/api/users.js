const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all  Users
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// Get User by Id
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

// Get all Users that one User follows
router.get("/following/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const followingList = await prisma.userRelationship.findMany({
      where: {
        userId: +id,
      },
      select: {
        following: {
          select: {
            id: true,
            fName: true,
            lName: true,
          },
        },
      },
    });
    res.status(200).json(followingList);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// Follow a User
router.post("/follow", async (req, res, next) => {
  const { userId, followingId } = req.body;
  try {
    const followUser = await prisma.userRelationship.create({
      data: {
        userId,
        followingId,
      },
    });
    res.status(200).json(followUser);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// Unfollow a user
router.delete("/unfollow", async (req, res, next) => {
  const { userId, followingId } = req.body;
  try {
    const unfollowUser = await prisma.userRelationship.delete({
      where: {
        userId_followingId: {
          userId: +userId,
          followingId: +followingId,
        },
      },
    });
    res.status(200).json(unfollowUser);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
module.exports = router;
