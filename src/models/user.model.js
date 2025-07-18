const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['employer', 'craftsman', 'admin'], required: true },
  mobileNumber: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profile: {
    bio: String,
    location: String,
    skills: [String],  // For craftsmen
    contactDetails: String,
  },
  approved: { type: Boolean, default: false }, // for admin approval
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
