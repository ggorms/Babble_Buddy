This project is a PERN-stack private messaging web app

# Follow steps to run locally

## Database

Create a PostgreSQL database called "babble"

## Clone the repository 

```bash
git clone git@github.com:ggorms/Babble_Buddy.git
```

## Navigate to project directory and split terminal

## Start the Server in One Terminal

Navigate to server folder

```bash
cd server
```

Install Dependancies

```bash
npm install
```

Migrate Database Schema

```bash
npx prisma migrate dev --name init
```

Generate Prisma Instance

```bash
npx prisma generate
```

Populate Database

```bash
npm run seed
```

Start the server 

```bash
npm run watch
```

## Start the client in the Other Terminal

Navigate to client folder

```bash
cd client
```

Install Dependancies

```bash
npm install
```

start the server

```bash
npm run dev
```
