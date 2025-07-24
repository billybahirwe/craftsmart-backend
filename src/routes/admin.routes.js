const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

// GET login page
router.get('/admin-login', (req, res) => {
  console.log('GET /admin-login - rendering login page');
  res.render('admin-login');
});

// POST login form
router.post('/admin-login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`POST /admin-login - received username: ${username}`);

    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log('Admin not found');
      return res.status(401).render('admin-login', { error: 'Invalid username or password' });
    }

    if (admin.password !== password) {
      console.log('Password mismatch');
      return res.status(401).render('admin-login', { error: 'Invalid username or password' });
    }

    req.session.isLoggedIn = true;
    req.session.adminUser = admin.username;
    console.log(`Admin ${admin.username} logged in successfully`);

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).render('admin-login', { error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
