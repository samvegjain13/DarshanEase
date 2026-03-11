const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json("Access Denied");

    try {
      const decoded = jwt.verify(token.split(" ")[1], "yourSecretKey");
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json("Forbidden");
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json("Invalid Token");
    }
  };
};

module.exports = authMiddleware;
