// Require the dotenv package to load environment variables from .env file
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

// Initialize the Express application
const app = express();

// Connect to the MongoDB database
connectDB();

// Middleware to parse JSON data
app.use(express.json());

// Define routes for user management
app.use('/api/users', userRoutes);

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

