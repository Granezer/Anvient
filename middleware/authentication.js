const jwt = require("jsonwebtoken");
const key = process.env.JWT_KEY;

const authorizationMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ msg: "Invalid credentials to access this link!!!" });
  }
    const token = authorization.split(" ")[1];
    
    const decoded = jwt.verify(token, key);
      const { username } = decoded
    req.user = username
  next();
};

module.exports = authorizationMiddleware;
