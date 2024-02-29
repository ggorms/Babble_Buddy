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
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        fName: true,
        lName: true,
        avatar: true,
      },
    });

    const userFollowings = await prisma.userRelationship.findMany({
      where: {
        userId: user.id,
      },
      select: {
        following: {
          select: {
            id: true,
            fName: true,
            lName: true,
            avatar: true,
          },
        },
      },
    });

    const userFollowers = await prisma.userRelationship.findMany({
      where: {
        followingId: user.id,
      },
      select: {
        user: {
          select: {
            id: true,
            fName: true,
            lName: true,
            avatar: true,
          },
        },
      },
    });

    const sinlgeUser = {
      id: user.id,
      fName: user.fName,
      lName: user.lName,
      avatar: user.avatar,
      following: userFollowings,
      followers: userFollowers,
    };

    res.status(200).json(sinlgeUser);
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
            avatar: true,
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
router.post("/follow/:userId/:followingId", async (req, res, next) => {
  const { userId, followingId } = req.params;
  try {
    const followUser = await prisma.userRelationship.create({
      data: {
        userId: +userId,
        followingId: +followingId,
      },
    });
    res.status(200).json(followUser);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// Unfollow a user
router.delete("/unfollow/:userId/:followingId", async (req, res, next) => {
  const { userId, followingId } = req.params;
  // USE PARAMS INSTEAD OF REQ.BODY
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
