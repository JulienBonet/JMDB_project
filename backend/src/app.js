/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        imgSrc: ["'self'", 'data:', 'https://image.tmdb.org'],
      },
    },
  })
);

// CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:8080',
      'http://localhost',
      'https://jmdb.julienbonet.fr',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Parsing
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: false, limit: '30mb', parameterLimit: 50000 }));

// Import des routes API
const router = require('./router');

app.use('/api', router);

// Build React
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'jmdb-backend',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  console.error('On route:', req.method, req.originalUrl);

  res.status(500).json({
    error: 'Internal server error',
  });
});

module.exports = app;
