const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add more fields as needed
});


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  });

const User = mongoose.model('User', userSchema);



module.exports = User;