const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");

// Middleware to extract and verify JWT token
apiRouter.use(async (req, res, next) => {
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith("Bearer ")) {
    const token = auth.slice(7); // Extract token from Authorization header
    // Update/replace Bearer in the event of change to True authorization header prefix if different.
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken; // Set user object in request

      // Proceed to the next middleware
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with 'Bearer'`,
    });
  }
});

// Import routers
const usersRouter = require("./users");
const carsRouter = require("./cars");
const cartRouter = require("./cart");

const ordersRouter = require("./orders");

// Mount routers
apiRouter.use("/users", usersRouter);
apiRouter.use("/cars", carsRouter);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/review", require("./review"));

// Error handling middleware
apiRouter.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = apiRouter;
