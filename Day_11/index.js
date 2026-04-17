require('dotenv').config();

const express = require('express');
const http = require('http');
const { Worker } = require('worker_threads');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());

// ------------------ BASIC ROUTE ------------------
app.get('/', (req, res) => {
  res.send('Server Running 🚀');
});

// ------------------ TEST ROUTE ------------------
app.get('/test', (req, res) => {
  res.send("✅ Server is still responsive!");
});

// ------------------ HEAVY TASK ROUTE ------------------
app.get('/api/heavy-task', (req, res) => {
  console.log("🔵 Request received at:", new Date().toLocaleTimeString());

  const worker = new Worker('./worker.js', {
    workerData: { iterations: 100000000 }
  });

  worker.on('message', (result) => {
    console.log("🟢 Result received at:", new Date().toLocaleTimeString());

    res.json({
      success: true,
      result
    });
  });

  worker.on('error', (err) => {
    console.error("❌ Worker error:", err);
    res.status(500).json({ error: err.message });
  });
});

// ------------------ START SERVER ------------------
const PORT = 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});