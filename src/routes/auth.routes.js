const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// ========== ADMIN AUTH ==========
const ADMIN_USER = {
  email: 'admin@example.com',
  password: 'admin123',
};

router.get('/admin-login', (req, res) => {
  res.render('admin-login', { title: 'Admin Login' });
});

router.post('/admin-login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
    req.session.isLoggedIn = true;
    req.session.user = { role: 'admin', email };
    return res.redirect('/admin/dashboard');
  }
  return res.render('admin-login', {
    title: 'Admin Login',
    error: 'Invalid email or password',
  });
});

router.get('/admin-logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Logout failed');
    res.clearCookie('connect.sid');
    res.redirect('/admin-login');
  });
});

// ========== USER AUTH ==========

router.get('/', (req, res) => res.render('home'));

router.get('/login', (req, res) => res.render('user-login'));

router.get('/register', (req, res) => res.render('user-register'));

// ✅ User Login
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.render('user-login', { error: 'Please fill in all fields.' });
  }

  try {
    const user = await User.findOne({ username, role });
    if (!user) return res.render('user-login', { error: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render('user-login', { error: 'Incorrect password.' });

    req.session.user = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    return res.redirect(role === 'employer' ? '/employer' : '/craftsman');
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).render('user-login', { error: 'Server error during login.' });
  }
});

// ✅ User Registration
router.post('/register', async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    mobileNumber,
    region,
    district,
    city,
    skills,
    bio,
  } = req.body;

  if (!username || !password || !role || !region || !district || !city) {
    return res.render('user-register', { error: 'Please fill in all required fields.' });
  }

  try {
    const existingUser = await User.findOne({
      $or: [
        { username },
        { email: email || null },
        { mobileNumber: mobileNumber || null }
      ]
    });

    if (existingUser) {
      return res.render('user-register', {
        error: 'Username, email, or mobile number already exists.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email: email || undefined,
      password: hashedPassword,
      role,
      mobileNumber,
      location: {
        region,
        district,
        city
      },
      bio: bio || '',
      skills: skills ? skills.split(',').map(skill => skill.trim()) : [],
    });

    await newUser.save();

    req.session.user = {
      id: newUser._id,
      username: newUser.username,
      role: newUser.role,
    };

    return res.redirect(role === 'employer' ? '/employer' : '/craftsman');
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).render('user-register', {
      error: 'Server error during registration.'
    });
  }
});

// ✅ General Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

// ========== MIDDLEWARE ==========
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.redirect('/admin-login');
}

function isUser(req, res, next) {
  if (req.session.user && ['employer', 'craftsman'].includes(req.session.user.role)) {
    return next();
  }
  return res.redirect('/login');
}

module.exports = router;
module.exports.isAdmin = isAdmin;
module.exports.isUser = isUser;
