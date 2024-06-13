const express = require("express");
const adminUsersRouter = express.Router();
const {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserByUsername,
} = require("../db");
const prisma = require("../client");
const bcrypt = require("bcrypt");

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  const user = req.query;
  console.log(user);
  if (!user.Admin) {
    return res.status(403).send({ message: "Unauthorized for this action" });
  }
  next();
};

// Get all users
adminUsersRouter.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.send(allUsers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Delete user by ID
adminUsersRouter.delete("/:id", isAdmin, async (req, res, next) => {
  const userId = req.params.id;
  try {
    const deletedUser = await prisma.users.delete({
      where: {
        id: +userId,
      },
    });
    res.status(200).json({ message: `User ${userId} deleted successfully` });
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);
  }
});

// Create new user
adminUsersRouter.post("/", isAdmin, async (req, res, next) => {
  const { email, password, fullName, username, address, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await createUser({
      email,
      password: hashedPassword,
      fullName,
      username,
      address,
      phone,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    next(error);
  }
});

// Update user
adminUsersRouter.put("/:id", isAdmin, async (req, res, next) => {
  const userId = req.params.id;
  const { email, username, address, phone } = req.body;
  try {
    const updatedUser = await prisma.users.update({
      where: { id: +userId },
      data: {
        email,
        username,
        address,
        phone,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user information:", error);
    next(error);
  }
});

module.exports = adminUsersRouter;
