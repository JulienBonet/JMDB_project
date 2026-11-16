const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Le token a dépassé sa durée de validité
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }

      // Le token est invalide pour une autre raison
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

module.exports = auth;
