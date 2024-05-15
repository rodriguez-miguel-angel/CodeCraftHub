const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


/**
 * Controller function to register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};


/**
 * Controller function to authenticate a user and generate a JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id }, 'your_secret_key');
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};


/**
 * Controller function to update user profile information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateUserProfile = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password']; // Add more fields if needed
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }
  
    try {
      updates.forEach((update) => (req.user[update] = req.body[update]));
      await req.user.save();
  
      res.send(req.user);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  /**
 * Controller function to delete user account
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
  const deleteUserAccount = async (req, res) => {
    try {
      await req.user.remove();
      res.send(req.user);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  /**
 * Middleware function to authenticate user using JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    try {
      const decoded = jwt.verify(token, 'your_secret_key');
      const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
  
      if (!user) {
        throw new Error();
      }
  
      req.user = user;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Please authenticate.' });
    }
  };
  // Other controller functions remain the same

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserAccount,
  authenticateUser,
  authorizeUser,
  validateUserInput,
};