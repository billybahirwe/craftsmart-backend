const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: String,
  password: String, // store hashed password in production!
});

module.exports = mongoose.model('Admin', adminSchema);
