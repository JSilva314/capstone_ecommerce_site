const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../client");

// Login endpoint
authRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).send({ message: "Incorrect username or password" });
    return; // 'return' used to ensure code below is not run in the event the username/pw are incorrect.
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      res.status(401).send({ message: "Not Authorized!" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );
    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
  }
});

// Register endpoint
authRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  const SALT_ROUNDS = 5;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );
    res.status(201).send({ token });
  } catch (error) {
    console.error(error);
  }
});

// Other authentication-related endpoints...

module.exports = authRouter;
