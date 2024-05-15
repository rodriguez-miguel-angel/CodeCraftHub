// Require the dotenv package to load environment variables from .env file
require('dotenv').config();

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Access environment variables
const secretKey = process.env.SECRET_KEY;

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

    return res.status(201).send({ 
      message: 'User registered successfully',
      user: {
        username : user.username,
        email : user.email,
      },
    });
  } catch (error) {
    return res.status(400).send(error);
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
    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Check if the password is correct
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    // Generate a JSON Web Token (JWT)
    const token = jwt.sign({ _id: user._id }, secretKey, {expiresIn: '1h'});
    
    return res.status(200).send({token: token});
  } catch (error) {
    return res.status(500).send(error);
  }
};


/**
 * Controller function to update user profile information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateUserProfile = async (req, res) => {

    const { username } = req.params;
    const filter = req.params;
    const update = req.body.password;

    try {
      // Check if the username exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      const updates = Object.keys(req.body);
      const allowedUpdates = ['password']; // Add more fields if needed
      const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  
      if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
      }
      // await req.user.update({username}, {password: password});
      // Update the user's password
      await User.updateOne(filter, update);
      
      return res.status(200).send({
        message: "User profile updated successfully",
        user: user,
      });
    } catch (error) {
      res.status(400).send(error);
    }


    // const updates = Object.keys(req.body);
    // const allowedUpdates = ['password']; // Add more fields if needed
    // const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  
    // if (!isValidOperation) {
    //   return res.status(400).send({ error: 'Invalid updates' });
    // }
  
    // try {
    //   updates.forEach((update) => (req.user[update] = req.body[update]));
      //await req.user.save();
      
  
    //   return res.status(200).send({
    //     message: "User profile updated successfully",
    //     user: req.user,
    //   });
    // } catch (error) {
    //   res.status(400).send(error);
    // }
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

  /**
 * Middleware function to authorize user based on role
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authorizeUser = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ error: 'Unauthorized access.' });
  }

  next();
};

/**
 * Middleware function to validate user input
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateUserInput = (req, res, next) => {
  // Add validation logic for user input here
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ error: 'Username, email, and password are required fields' });
  }
};


module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserAccount,
  authenticateUser,
  authorizeUser,
  validateUserInput,
};