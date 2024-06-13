require("dotenv").config();

const express = require("express");
const app = express();
const router = require("vite-express");

const bodyParser = require("body-parser");

// Import middleware
const authMiddleware = require("./middleware/authMiddleware");

// Import routers
const webhookRouter = require("./api/webhook");
const passwordResetRouter = require("./api/passwordreset");
const apiRouter = require("./api");
const usersRouter = require("./api/users");
const adminUsersRouter = require("./api/adminUsers");
const stripeRouter = require("./api/stripe");

// Middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Apply routes
app.use("/api/stripe/webhook", webhookRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/password-reset", passwordResetRouter); // No auth middleware for password reset
app.use("/api", apiRouter);
app.use("/api/users", authMiddleware, usersRouter); // Only these routes require auth middleware
app.use("/api/admin/users", authMiddleware, adminUsersRouter); // Only these routes require auth middleware

const db = require("./db/client");
db.connect();

router.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

module.exports = router;
