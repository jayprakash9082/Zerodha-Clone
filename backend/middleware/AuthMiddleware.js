const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  
  const header = req.headers.authorization;
  const token =
    header && header.startsWith("Bearer ") ? header.slice(7) : req.cookies.token;

  if (!token) return res.status(401).json({ message: "Login required" });
  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET).id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};