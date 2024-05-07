const express = require("express");
const prisma = require("../client");
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUser, getUserByEmail, createUser } = require('../db');
const bcrypt = require('bcrypt');

// Unsure if file is needed as bcrypt and jwt are used in db/users.js
// Update or REMOVE file in the event it is not used.

// Login endpoint
authRouter.post('/login', async (req, res, next) => {
    // Handle user login logic here
});

// Register endpoint
authRouter.post('/register', async (req, res, next) => {
    // Handle user registration logic here
});

// Other authentication-related endpoints...

module.exports = authRouter;
