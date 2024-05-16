// Require the dotenv package to load environment variables from .env file
require('dotenv').config();

const mongoose = require('mongoose');

// Access environment variables
const mongoURI = process.env.MONGODB_URI;

/**
 * Function to connect to the MongoDB database
 */
const connectDB = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(mongoURI, {
      // Deprecated options:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    // Handle connection errors
    console.error('Error connecting to MongoDB:', error);
  }
};

// Export the connectDB function for external use
module.exports = connectDB;