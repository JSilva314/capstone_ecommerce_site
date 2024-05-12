const express = require("express");
const usersRouter = express.Router();
const prisma = require("../client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Import middleware if needed
const authMiddleware = require("../middleware/authMiddleware");

// Import user-related database functions
const { createUser, getUser, getUserByEmail } = require("../db");

// Login endpoint
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).send({ message: "Incorrect email or password" });
    return;
  }

  try {
    const user = await prisma.users.findUnique({
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

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      res.status(400).send({ message: "User already exists" });
      return;
    }

    const newUser = await createUser({
      email,
      password,
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
usersRouter.get("/profile", authMiddleware, async (req, res, next) => {
  console.log(req.user);
  const userId = req.user.id; // Extract user ID from decoded token
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send user details as response
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});
// Other user-related routes...

module.exports = usersRouter;
