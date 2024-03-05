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

Create ".env" file inside server folder and populate it with the following
(replace username and password with your username and password to your machine)
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/babble"
JWT = "uUbR5diUhR430BfE"
```


Migrate Database Schema

```bash
npx prisma migrate dev 
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
