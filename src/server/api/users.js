const express = require("express");
const usersRouter = express.Router();
const prisma = require("../client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Import middleware if needed
const authMiddleware = require("../middleware/authMiddleware");

// Import user-related database functions
const {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserByUsername,
} = require("../db");

usersRouter.get("/", async (req, res, next) => {
  const user = req.query;
  try {
    if (user.Admin) {
      const allUsers = await getAllUsers();
      res.send(allUsers);
    }
  } catch (error) {
    console.error(error);
  }
});

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
  const { email, password, fullName, username, address, phone } = req.body;

  // Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordMinLength = 8;
  const passwordRegex =
    /^(?=.*[a-z])(?=(?:.*[A-Z]){2,})(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  const usernameRegex = /^[a-zA-Z0-9_]+$/; // Username can only contain letters, numbers, and underscores

  if (!email || !emailRegex.test(email)) {
    return res.status(400).send({ message: "Invalid email address" });
  }

  if (
    !password ||
    password.length < passwordMinLength ||
    !passwordRegex.test(password)
  ) {
    return res.status(400).send({
      message:
        "Password must be at least 8 characters long, contain at least 2 capital letters, 1 lowercase letter, and 1 special character",
    });
  }

  if (!username || !usernameRegex.test(username)) {
    return res.status(400).send({
      message: "Username must contain only letters, numbers, and underscores",
    });
  }

  if (!fullName) {
    return res.status(400).send({ message: "Full name is required" });
  }

  if (!address) {
    return res.status(400).send({ message: "Address is required" });
  }

  try {
    const existingUserByEmail = await getUserByEmail(email);
    if (existingUserByEmail) {
      return res.status(409).send({ message: "Email Already Registered" });
    }

    const existingUserByUsername = await getUserByUsername(username);
    if (existingUserByUsername) {
      return res.status(409).send({ message: "Username Already Taken" });
    }

    const newUser = await createUser({
      email,
      password,
      fullName,
      username,
      address,
      phone,
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

usersRouter.delete("/:id", async (req, res, next) => {
  const userId = req.params.id;
  console.log(userId, "user ID");

  console.log("Deleting user with ID:", userId);
  try {
    const deletedUser = await prisma.users.delete({
      where: {
        id: +userId,
      },
    });
    console.log("User deleted:", deletedUser);
    res.status(200).json({ message: `User ${userId} deleted successfully` });
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);
  }
});

module.exports = usersRouter;
