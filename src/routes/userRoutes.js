// Require necessary packages and modules
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserProfile } = require('../controllers/userController');

// Home route for /users
router.get('/', (req, res) => {
  // Display a welcome message for the User Management Service
  res.send('Welcome to the User Management Service');
});

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);
// Add more routes as needed

// Route for updating user profile
router.put('/:username', updateUserProfile);

// Export the router for use in the application
module.exports = router;