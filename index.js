require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Import Controller
const userController = require('./controllers/userController');

// Routes
app.get('/', (req, res) => {
  res.send('Server Running');
});

app.get('/about', (req, res) => {
  res.send('This is the About API — Backend logic is active.');
});

app.get('/user', (req, res) => {
  res.json({
    name: "Vishnu",
    role: "Backend Developer"
  });
});

// Status API
app.get('/status', (req, res) => {
  res.json({
    message: "System Online",
    environment_port: port,
    auth_status: process.env.API_KEY ? "Securely Loaded" : "Missing Key"
  });
});

// Controller API
app.get('/api/users', userController.getUsers);

// POST API
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and Password are required!"
    });
  }

  res.status(201).json({
    message: "User Registered Successfully",
    user: username
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});