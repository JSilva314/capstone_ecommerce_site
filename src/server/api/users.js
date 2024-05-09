const express = require("express");
const usersRouter = express.Router();
const prisma = require("../client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Import middleware if needed
const authMiddleware = require("../middleware/authMiddleware");

// Import user-related database functions
const { createUser, getUser, getUserByEmail } = require('../db');

// Login endpoint
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).send({ message: "Incorrect email or password" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401).send({ message: "User not found" });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      res.status(401).send({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );
    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Register endpoint
usersRouter.post("/register", async (req, res, next) => {
  const { email, password } = req.body;
  const SALT_ROUNDS = 10; // Increase salt rounds for better security
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      res.status(400).send({ message: 'User already exists' });
      return;
    }

    const newUser = await createUser({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET
    );

    res.status(201).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Other user-related routes...

module.exports = usersRouter;
