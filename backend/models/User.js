const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving
// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Define comparePassword method to compare password with hash
userSchema.methods.comparePassword = async function(password) {
  console.log('Entered Password:', password);  // Log the password entered
  console.log('Stored Hash:', this.password);  // Log the stored hash in the DB
  const isMatch = await bcrypt.compare(password, this.password);
  console.log('Password Match Result:', isMatch);  // Log the comparison result
  return isMatch;
};


// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
