const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Login route for existing users

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  // Check if provided email corresponds to an existing user
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!foundUser) {
      res.status(404).json({
        message: "User Does Not Exist",
      });
    } else {
      const { password: userPassword } = foundUser;

      // Compare password from request body with the password from the user with corresponding email
      const validPassword = await bcrypt.compare(password, userPassword);

      if (!validPassword) {
        res.status(404).json({
          message: "Incorrect Password",
        });
        return;
      }

      const token = jwt.sign(foundUser.email, process.env.JWT);

      res.status(200).json({ ...foundUser, token });
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// Register route for new users

router.post("/register", async (req, res, next) => {
  const SALT_ROUNDS = 5;
  try {
    const { email, password, fName, lName } = req.body;

    // Check if email provided is already associated with an existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(500).json({
        message: "Email is already in use.",
      });
    } else {
      // Encrpyt password from request body
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          fName,
          lName,
        },
      });

      const token = jwt.sign(newUser.email, process.env.JWT);

      res.status(201).json({ ...newUser, token });
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
