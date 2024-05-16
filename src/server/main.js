require("dotenv").config();

const express = require("express");
const router = require("vite-express");
const app = express();

const bodyParser = require("body-parser");

//Import authMiddleware
const authMiddleware = require("./middleware/authMiddleware");
const webhookRouter = require("./api/webhook");

// Apply auth middleware to the /api routes
app.use("/api/stripe/webhook", webhookRouter);
// Middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = require("./db/client");
db.connect();

// Declare Routes
const apiRouter = require("./api");
const usersRouter = require("./api/users");
const stripeRouter = require("./api/stripe");

// Apply auth middleware to the /api routes
app.use("/api/stripe", stripeRouter);
app.use("/api", apiRouter);
app.use("/api", authMiddleware, usersRouter);
// ADD more routes that require authorization

router.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

module.exports = router;
