// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Example user validation (replace with DB in real app)
const ADMIN_USER = {
  email: 'admin@example.com',
  password: 'admin123', // In production, use hashed passwords!
};

// GET /admin-login — render login page
router.get('/admin-login', (req, res) => {
  res.render('admin-login', { title: 'Admin Login' });
});

// POST /login — handle login form
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
    // Save login state in session
    req.session.isLoggedIn = true;
    req.session.user = ADMIN_USER;

    res.redirect('/dashboard');
  } else {
    res.render('admin-login', {
      title: 'Admin Login',
      error: 'Invalid email or password',
    });
  }
});

// GET /logout — handle logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Logout failed');
    }

    res.clearCookie('connect.sid'); // optional: clear session cookie
    res.redirect('/admin-login');
  });
});

// Optional middleware to protect routes
function isAuthenticated(req, res, next) {
  if (req.session.isLoggedIn) {
    return next();
  }
  res.redirect('/admin-login');
}

module.exports = router;
module.exports.isAuthenticated = isAuthenticated;
