const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load variables from .env file
dotenv.config();

// Use DATABASE from .env, fallback if needed
const mongoURI = process.env.DATABASE || 'mongodb://localhost:27017/craftsmart';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB connected to: ${mongoURI}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
