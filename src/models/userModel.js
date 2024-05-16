// Require necessary packages and modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema for MongoDB
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add more fields as needed
});

// Middleware function to hash the user's password before saving
userSchema.pre('save', async function(next) {
  // Check if the password field is modified
  if (!this.isModified('password')) {
      return next();
    }
    // Hash the password using bcrypt
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  });

// Create a User model based on the user schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in the application
module.exports = User;