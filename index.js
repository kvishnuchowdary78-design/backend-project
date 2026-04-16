require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// 🔥 Socket Server
const io = new Server(server, {
  cors: { origin: "*" }
});

// Basic route
app.get('/', (req, res) => {
  res.send('Server Running');
});

// 🔥 Socket Logic
io.on('connection', (socket) => {
  console.log("User connected:", socket.id);

  // 🔹 Receive message and broadcast
  socket.on('message', (data) => {
    console.log("Message received:", data);

    io.emit('message_broadcast', data);
  });

  // 🔹 Join room
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // 🔹 Send message to specific room
  socket.on('send_room_message', (data) => {
    io.to(data.room).emit('room_message', data);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log("User disconnected");
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});