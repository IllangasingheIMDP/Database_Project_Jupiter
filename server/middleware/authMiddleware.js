const JWT = require('jsonwebtoken');
const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).send({ message: 'Auth Failed: No token provided', success: false });
    }

    const token = authHeader.split(' ')[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).send({ message: 'Auth Failed: Token expired', success: false });
        }
        return res.status(401).send({ message: 'Auth Failed: Invalid token', success: false });
      }

      req.user = {
        username: decoded.username,
        authlevel: decoded.authlevel
      };
      if (!allowedRoles.includes(req.user.authlevel)) {
        return res.status(403).send({ message: 'Access Denied: Insufficient Permissions', success: false });
      }
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error', success: false });
  }
}};

module.exports = authMiddleware;