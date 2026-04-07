const express = require('express');
const app = express();

// Middleware (logs every request)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
  next();
});

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

// Dummy Database
const users = [
  { id: 1, name: "Alice", status: "Active" },
  { id: 2, name: "Bob", status: "Away" },
  { id: 3, name: "Charlie", status: "Offline" }
];

app.get('/api/users', (req, res) => {
  res.json(users);
});

// Server start
app.listen(3000, () => {
  console.log('Server started on port 3000');
});