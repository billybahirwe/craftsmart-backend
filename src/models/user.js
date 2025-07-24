const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['admin', 'employer', 'craftman'], required: true },
  name: String,
  email: String,
  password: String,
  blacklisted: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
