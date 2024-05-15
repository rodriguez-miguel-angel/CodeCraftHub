const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserProfile } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
// Add more routes as needed
router.put('/:username', updateUserProfile);

module.exports = router;