const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Accept token from multiple header types
  let token =
    req.header("Authorization") ||
    req.header("authorization") ||
    req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token. Authorization denied." });
  }

  // If token starts with "Bearer ", remove it
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded.id → user id
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};
