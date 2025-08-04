const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const session = require('express-session');

// Load environment variables
dotenv.config();

// MongoDB connection
const connectDB = require('./config/db'); // Assuming db.js is in 'config/' folder
connectDB(); // Call it once on startup

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

// Import Models
const User = require('./models/user');

// Import API routes
const userRoutes = require('./routes/user.routes');
const caseRoutes = require('./routes/case.routes');
const reviewRoutes = require('./routes/review.routes');
const blacklistRoutes = require('./routes/blacklist.routes');
const messageRoutes = require('./routes/message.routes');
const craftsmanRoutes = require('./routes/craftsman.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

// Import middleware
const { notFound, errorHandler } = require('./middlewares/error.middleware');

// ===== Middleware Setup =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ===== Session Setup =====
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'craftsmart_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  })
);

// ===== View Engine Setup =====
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ===== Admin Login/Logout Routes =====
app.use('/', adminRoutes);
app.use('/dashboard', dashboardRoutes);

// ===== API Routes =====
app.use('/api/users', userRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blacklist', blacklistRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/craftsmen', craftsmanRoutes);
app.use('/', authRoutes);

// ===== Form Route =====
app.get('/register', (req, res) => {
  res.render('user-register', { title: 'User Registration' });
});

app.post('/register', async (req, res) => {
  try {
    if (!req.body.email || req.body.email.trim() === '') {
      delete req.body.email;
    }

    if (typeof req.body.skills === 'string') {
      req.body.skills = req.body.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    const { region, district, city, ...rest } = req.body;
    const location = { region, district, city };

    const userData = { ...rest, location };

    const newUser = new User(userData);
    await newUser.save();

    res.redirect('/login');
  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(400).render('user-register', {
      title: 'User Registration',
      error: err.message,
    });
  }
});

// ===== Dashboards =====
app.get('/employer', (req, res) => {
  res.render('employer-dashboard', { title: 'Employer Dashboard' });
});

app.get('/craftsman', (req, res) => {
  res.render('craftsman-dashboard', { title: 'Craftsman Dashboard' });
});

app.get('/public-blacklist', (req, res) => {
  res.render('public-blacklist');
});

// ===== Error Handling (Always Last) =====
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

// ===== Start Server =====
const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
