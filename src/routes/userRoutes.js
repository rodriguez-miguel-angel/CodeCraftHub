const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserProfile } = require('../controllers/userController');

// Home route for /users
router.get('/', (req, res) => {
    res.send('Welcome to the User Management Service');
  });

router.post('/register', registerUser);
router.post('/login', loginUser);
// Add more routes as needed
router.put('/:username', updateUserProfile);

module.exports = router;