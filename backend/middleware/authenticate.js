const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded user information to the request object
    next(); // Continue to the next middleware/route
  } catch (err) {
    console.error('Invalid token:', err);
    res.status(403).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticate;
