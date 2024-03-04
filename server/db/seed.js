const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { AvatarGenerator } = require("random-avatar-generator");

const generator = new AvatarGenerator();

const users = [
  {
    fName: "Jane",
    lName: "Doe",
    email: "janedoe@gmail.com",
    password: "testing",
  },
  {
    fName: "Alex",
    lName: "Johnson",
    email: "alexjohnson@gmail.com",
    password: "testing",
  },
  {
    fName: "John",
    lName: "Miller",
    email: "johnmiller@gmail.com",
    password: "testing",
  },
  {
    fName: "Sara",
    lName: "Smith",
    email: "sarasmith@gmail.com",
    password: "testing",
  },
  {
    fName: "Jerome",
    lName: "Baker",
    email: "jeromebaker@gmail.com",
    password: "testing",
  },
  {
    fName: "Michael",
    lName: "Greenberg",
    email: "michaelgreenberg@gmail.com",
    password: "testing",
  },
  {
    fName: "Morgan",
    lName: "Klein",
    email: "morganklein@gmail.com",
    password: "testing",
  },
  {
    fName: "Keith",
    lName: "Wright",
    email: "keithwright@gmail.com",
    password: "testing",
  },
  {
    fName: "Lucy",
    lName: "Jefferson",
    email: "lucyjefferson@gmail.com",
    password: "testing",
  },
  {
    fName: "Richard",
    lName: "Miller",
    email: "richardmiller@gmail.com",
    password: "testing",
  },
];

const conversations = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

const userConversations = [
  {
    userId: 1,
    conversationId: 1,
  },
  {
    userId: 2,
    conversationId: 1,
  },
  {
    userId: 1,
    conversationId: 2,
  },
  {
    userId: 3,
    conversationId: 2,
  },
  {
    userId: 2,
    conversationId: 3,
  },
  {
    userId: 3,
    conversationId: 3,
  },
  {
    userId: 2,
    conversationId: 4,
  },
  {
    userId: 4,
    conversationId: 4,
  },
  {
    userId: 3,
    conversationId: 5,
  },
  {
    userId: 4,
    conversationId: 5,
  },
  {
    userId: 5,
    conversationId: 6,
  },
  {
    userId: 6,
    conversationId: 6,
  },
  {
    userId: 5,
    conversationId: 7,
  },
  {
    userId: 7,
    conversationId: 7,
  },
  {
    userId: 6,
    conversationId: 8,
  },
  {
    userId: 8,
    conversationId: 8,
  },
  {
    userId: 8,
    conversationId: 9,
  },
  {
    userId: 9,
    conversationId: 9,
  },
  {
    userId: 9,
    conversationId: 10,
  },
  {
    userId: 10,
    conversationId: 10,
  },
];

const messages = [
  {
    text: "Hey there",
    conversationId: 1,
    senderId: 1,
  },
  {
    text: "How's it going?",
    conversationId: 1,
    senderId: 2,
  },
  {
    text: "What's up?",
    conversationId: 2,
    senderId: 1,
  },
  {
    text: "Nothing much, you?",
    conversationId: 2,
    senderId: 3,
  },
  {
    text: "Howdy partner",
    conversationId: 3,
    senderId: 3,
  },
  {
    text: "Much obliged",
    conversationId: 3,
    senderId: 2,
  },
  {
    text: "Hi",
    conversationId: 4,
    senderId: 4,
  },
  {
    text: "Hello",
    conversationId: 4,
    senderId: 2,
  },
  {
    text: "Good day",
    conversationId: 5,
    senderId: 3,
  },
  {
    text: "indeed",
    conversationId: 5,
    senderId: 4,
  },
  {
    text: "How do you do?",
    conversationId: 6,
    senderId: 5,
  },
  {
    text: "I am well",
    conversationId: 6,
    senderId: 6,
  },
  {
    text: "Yo",
    conversationId: 7,
    senderId: 5,
  },
  {
    text: "What's up",
    conversationId: 7,
    senderId: 7,
  },
  {
    text: "What is the meaning of life?",
    conversationId: 8,
    senderId: 6,
  },
  {
    text: "To code all day and night",
    conversationId: 8,
    senderId: 6,
  },
  {
    text: "Did you finish that project yet?",
    conversationId: 9,
    senderId: 9,
  },
  {
    text: "It will never truely be done in my eyes",
    conversationId: 9,
    senderId: 8,
  },
  {
    text: "Yoddelle he who",
    conversationId: 10,
    senderId: 10,
  },
  {
    text: "Huh?",
    conversationId: 10,
    senderId: 9,
  },
];

const userRelationships = [
  {
    userId: 1,
    followingId: 2,
  },
  {
    userId: 1,
    followingId: 3,
  },
  {
    userId: 1,
    followingId: 4,
  },
  {
    userId: 1,
    followingId: 5,
  },
  {
    userId: 2,
    followingId: 1,
  },
  {
    userId: 3,
    followingId: 1,
  },
  {
    userId: 4,
    followingId: 1,
  },
  {
    userId: 5,
    followingId: 1,
  },
  {
    userId: 3,
    followingId: 8,
  },
  {
    userId: 3,
    followingId: 9,
  },
  {
    userId: 4,
    followingId: 10,
  },
  {
    userId: 4,
    followingId: 7,
  },
  {
    userId: 4,
    followingId: 2,
  },
  {
    userId: 9,
    followingId: 2,
  },
  {
    userId: 10,
    followingId: 2,
  },
  {
    userId: 10,
    followingId: 1,
  },
  {
    userId: 6,
    followingId: 5,
  },
  {
    userId: 6,
    followingId: 8,
  },
  {
    userId: 5,
    followingId: 10,
  },
  {
    userId: 5,
    followingId: 9,
  },
  {
    userId: 10,
    followingId: 4,
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
          avatar: generator.generateRandomAvatar(`${user.email}`),
        },
      });
    })
  );
  await Promise.all(
    conversations.map(async (convo) => {
      return prisma.conversation.create({
        data: {
          id: convo.id,
        },
      });
    })
  );
  await Promise.all(
    userConversations.map(async (userConvo) => {
      return prisma.userConversation.create({
        data: {
          userId: userConvo.userId,
          conversationId: userConvo.conversationId,
        },
      });
    })
  );
  await Promise.all(
    messages.map(async (message) => {
      return prisma.message.create({
        data: {
          text: message.text,
          conversationId: message.conversationId,
          senderId: message.senderId,
          date: new Date(Date.now()),
        },
      });
    })
  );
  await Promise.all(
    userRelationships.map(async (userRelationship) => {
      return prisma.userRelationship.create({
        data: {
          userId: userRelationship.userId,
          followingId: userRelationship.followingId,
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
