require('dotenv').config();

const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect Database
connectDB();

// Test Route
app.get('/', (req, res) => {
  res.send('Server Running');
});

// POST API
app.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});