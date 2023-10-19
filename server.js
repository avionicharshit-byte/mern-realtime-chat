const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Add Socket.io event handling here
io.on('connection', (socket) => {
  console.log('A user connected');

  // Join a chat room
  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    console.log(`User joined room: ${roomName}`);
  });

  // Leave a chat room
  socket.on('leaveRoom', (roomName) => {
    socket.leave(roomName);
    console.log(`User left room: ${roomName}`);
  });

  // Handle new chat messages
  socket.on('chatMessage', (message) => {
    io.to(message.room).emit('message', message);
  });

  // Handle task updates
  socket.on('updateTask', (updatedTask) => {
    io.to(updatedTask.roomId).emit('taskUpdated', updatedTask);
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://333charliedev:oOfUUFXPEb7CdzSL@cluster0.yymcdga.mongodb.net/<dbname>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const PORT = process.env.PORT || 5000;


// react client routes
app.use(express.static(path.join(__dirname, 'client', 'build')));


// Remove the redundant app.listen() call
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
