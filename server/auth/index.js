const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verify = require("./verify");
const { body, validationResult } = require("express-validator");
const { AvatarGenerator } = require("random-avatar-generator");

const generator = new AvatarGenerator();

// Login route for existing users
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  // Check if provided email corresponds to an existing user
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!foundUser) {
      res.status(404).json({ message: "Incorrect Email or Password" });
    } else {
      const { password: userPassword } = foundUser;

      // Compare password from request body with the password from the user with corresponding email
      const validPassword = await bcrypt.compare(password, userPassword);

      if (!validPassword) {
        res.status(404).json({ message: "Incorrect Email or Password" });
        return;
      }

      const token = jwt.sign(foundUser.id, process.env.JWT);

      res.status(200).json({ token });
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// Register route for new users
router.post(
  "/register",
  body("fName")
    .isLength({ min: 3 })
    .withMessage("First Name must be at least 5 letters"),
  body("lName")
    .isLength({ min: 3 })
    .withMessage("Last Name must be at least 5 letters"),
  body("email").isEmail().withMessage("Enter a Valid Email Address"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),
  async (req, res, next) => {
    const SALT_ROUNDS = 5;
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        const { email, password, fName, lName } = req.body;

        // Check if email provided is already associated with an existing user
        const existingUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (existingUser) {
          res.status(500).json({ message: "Email is already in use." });
        } else {
          // Encrpyt password from request body
          const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

          const newUser = await prisma.user.create({
            data: {
              email: email.toLowerCase(),
              password: hashedPassword,
              fName: fName[0].toUpperCase() + fName.slice(1).toLowerCase(),
              lName: lName[0].toUpperCase() + lName.slice(1).toLowerCase(),
              avatar: generator.generateRandomAvatar(`${email}`),
            },
          });

          const token = jwt.sign(newUser.id, process.env.JWT);

          res.status(201).json({ token });
        }
      } catch (error) {
        console.error(error.message);
        next(error);
      }
    } else {
      res.status(400).json({ message: result.errors[0].msg });
    }
  }
);

// ME

router.get("/me", verify, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +req.user,
      },
      select: {
        id: true,
        email: true,
        fName: true,
        lName: true,
        avatar: true,
      },
    });
    res.status(200).json({
      userId: user.id,
      email: user.email,
      fName: user.fName,
      lName: user.lName,
      avatar: user.avatar,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
