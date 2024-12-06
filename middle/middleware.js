const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: '🔒 Unauthorized. No token provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.currentUser = decodedToken;
    next();
  } catch (error) {
    res.status(400).json({ message: '❌ Token validation failed. Please log in again.' });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.currentUser.role !== 'admin') {
    return res.status(403).json({ message: '🚫 Forbidden. Admin access required.' });
  }
  next();
};

module.exports = { authenticateUser, authorizeAdmin };
