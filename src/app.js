const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Import routes
const userRoutes = require('./routes/user.routes');
const caseRoutes = require('./routes/case.routes');
const reviewRoutes = require('./routes/review.routes');
const blacklistRoutes = require('./routes/blacklist.routes');
const messageRoutes = require('./routes/message.routes');
const craftsmanRoutes = require('./routes/craftsman.routes');

// Import error handlers
const { notFound, errorHandler } = require('./middlewares/error.middleware');

// Create app and server
const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// ===== Middlewares =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ===== View Engine Setup =====
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ===== UI Route for Craftsman Form (example frontend) =====
app.get('/dashboard/craftsman', (req, res) => {
  res.render('craftsman'); // Renders views/craftsman.pug
});

// ===== API Routes =====
app.use('/api/users', userRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blacklist', blacklistRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/craftsmen', craftsmanRoutes); 

// ===== Error Handling =====
app.use(notFound);
app.use(errorHandler);

// ===== Socket.IO Events =====
io.on('connection', (socket) => {
  console.log('✅ Socket connected:', socket.id);

  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
});

// ===== Connect to MongoDB & Start Server =====
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
