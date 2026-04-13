const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1:27017/my_backend_db';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;