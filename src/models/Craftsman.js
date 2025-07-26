const mongoose = require('mongoose');

const craftsmanSchema = new mongoose.Schema({
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
  contact: { type: String, unique: true, sparse: true, trim: true },
  location: { type: String },
  skills: { type: [String], default: [] },
  bio: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Craftsman', craftsmanSchema);
