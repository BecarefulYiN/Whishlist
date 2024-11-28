const jwt = require('jsonwebtoken');
require('dotenv').config()
const { JWT_SECRET } = process.env; // Ensure you have a JWT_SECRET set in your environment variables

// Middleware to check for a valid JWT
const authenticateJWT = (req, res, next) => {
  console.log("Authorization Header:", req.headers['authorization']); // Log the header to see if it contains the token

  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
    req.user = decoded;
    next();
  });
};


module.exports = authenticateJWT;
