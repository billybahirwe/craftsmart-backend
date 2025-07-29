const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        // Allow undefined, null, or empty string — validate only if not empty
        return !v || /.+\@.+\..+/.test(v);
      },
      message: 'Please enter a valid email address',
    },
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['employer', 'craftsman'],
    required: true,
  },

  mobileNumber: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },

  location: {
    region: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },

  skills: {
    type: [String],
    default: [],
  },

  bio: {
    type: String,
    default: '',
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
