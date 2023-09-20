const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

// const User = mongoose.model('User', userSchema, 'testlogin');
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
