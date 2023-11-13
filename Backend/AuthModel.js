

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Authentication', userSchema);
