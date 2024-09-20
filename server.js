const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./src/routes');
require('dotenv').config(); // To use environment variables
const cors = require('cors'); // Middleware for handling CORS

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for cross-origin requests

// Change the server URL to use an environment variable or fallback to a default MongoDB URL
const server = process.env.MONGO_URI || 'mongodb://localhost:27017/interviewProject';

// Routes
app.use('/', routes);

// Connect to MongoDB
mongoose
  .connect(server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected');
    const port = process.env.PORT || 3000;

    // Start the server
    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

// Error handling middleware for unhandled routes
app.use((req, res, next) => {
  res.status(404).send({
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'An internal server error occurred',
  });
});

