const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['employer', 'craftsman'],
    required: true,
  },
  mobileNumber: { type: String, unique: true, sparse: true, trim: true }, // unique but optional
  location: { type: String, trim: true },
  skills: { type: [String], default: [] },
  bio: { type: String, default: '', trim: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
