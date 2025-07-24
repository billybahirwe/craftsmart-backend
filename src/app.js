const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const session = require('express-session');

// Load environment variables
dotenv.config();

// Import API routes
const userRoutes = require('./routes/user.routes');
const caseRoutes = require('./routes/case.routes');
const reviewRoutes = require('./routes/review.routes');
const blacklistRoutes = require('./routes/blacklist.routes');
const messageRoutes = require('./routes/message.routes');
const craftsmanRoutes = require('./routes/craftsman.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');

// ✅ Add dashboard route
const dashboardRoutes = require('./routes/dashboard.routes'); 

// Import middleware
const { notFound, errorHandler } = require('./middlewares/error.middleware');

// Initialize express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// ===== Middleware Setup =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ===== Session Setup =====
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'craftsmart_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true in production (HTTPS)
  })
);

// ===== View Engine Setup =====
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ===== Admin Login/Logout Routes =====
app.use('/', adminRoutes);

// ✅ Use the dashboard route
app.use('/dashboard', dashboardRoutes); 

// ===== API Routes =====
app.use('/api/users', userRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blacklist', blacklistRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/craftsmen', craftsmanRoutes);
app.use('/', authRoutes);

// ===== Error Handling (MUST be last) =====
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

// ===== MongoDB Connection & Server Start =====
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5002;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
