const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    immutable: true,
  },
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
