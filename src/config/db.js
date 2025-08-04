const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env (for local dev)
dotenv.config();

// Get URI and DB name from environment
const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const connectDB = async () => {
  if (!mongoURI) {
    console.error('❌ MONGODB_URI or MONGO_URI is not defined in environment variables.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      dbName: dbName || 'craftsmart', // fallback if DB_NAME not set
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected to database: ${dbName || 'craftsmart'}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
