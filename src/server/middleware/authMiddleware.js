// Add middleware and review /db/users.js and /api/auth.js to ensure no redundent overlaps with JWT and bcrypt.

const jwt = require("jsonwebtoken");

// Middleware funct to authenticate requests
function authMiddleware(req, res, next) {
  // Extract JWT token from request header
  const token = req.headers.authorization;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing " });
  }

  try {
    // Verify JWT token
    console.log("hello", token);
    const decoded = jwt.verify(token, "your_secret_key");

    // Attach user information to the request object
    req.user = decoded.user;

    //Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Authorization token" });
  }
}

module.exports = authMiddleware;
