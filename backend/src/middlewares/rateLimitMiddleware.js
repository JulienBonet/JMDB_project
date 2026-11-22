const { rateLimit } = require('express-rate-limit');

// Limiteur général de l'API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please try again later.',
  },
});

// Limiteur spécifique à la connexion
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many login attempts. Please try again later.',
  },
});

module.exports = {
  apiLimiter,
  loginLimiter,
};
