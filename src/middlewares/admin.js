const session = require('express-session');

// Add session middleware before your routes
app.use(session({
  secret: 'your_secret_key', // change this to a secure secret in prod
  resave: false,
  saveUninitialized: false,
}));

// Protect dashboard route
app.get('/dashboard', (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/admin-login');
  }
  res.render('dashboard');
});

// Mount admin routes (make sure this is after session middleware)
const adminRoutes = require('./routes/admin.routes');
app.use('/', adminRoutes);
