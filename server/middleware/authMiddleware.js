const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).send({ message: 'Auth Failed: No token provided', success: false });
    }

    const token = authHeader.split(' ')[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Auth Failed: Invalid token', success: false });
      }

      req.body.username = decoded.username;
      req.body.authlevel=decoded.authlevel;
      
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error', success: false });
  }
};
