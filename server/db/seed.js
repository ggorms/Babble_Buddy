const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const users = [
  {
    fName: "Emma",
    lName: "Schlesinger",
    email: "emma@gmail.com",
    password: "test",
  },
  {
    fName: "Gary",
    lName: "Gorman",
    email: "gary@gmail.com",
    password: "test",
  },
];

async function main() {
  const SALT_ROUNDS = 5;
  await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
      return prisma.user.create({
        data: {
          fName: user.fName,
          lName: user.lName,
          email: user.email,
          password: hashedPassword,
        },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
