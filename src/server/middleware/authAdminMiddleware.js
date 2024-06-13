// Add middleware and review /db/users.js and /api/auth.js to ensure no redundent overlaps with JWT and bcrypt.

const jwt = require("jsonwebtoken");

// Middleware funct to authenticate requests

function authAdminMiddleware(req, res, next) {
  // Extract JWT token from request header
  const token = req.headers.authorization;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing " });
  }

  try {
    // Verify JWT token
    console.log("hell124o", token);
    const authToken = token.replace("Bearer ", "");
    jwt.verify(authToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.status(403).send({ message: "Forbidden: Invalid token" });
      }
      req.user = user; // Attach user details to the request object
      console.log(user);
      if (user && user.Admin) {
        console.log("first");
        next();
      } else {
        return res
          .status(403)
          .send({ message: "Unauthorized for this action" });
      }
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid Authorization token" });
  }
}

module.exports = authAdminMiddleware;
