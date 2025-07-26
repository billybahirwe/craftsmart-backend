const express = require('express');
const router = express.Router();

// Middleware to simulate logged-in role (replace with actual auth check)
function requireUser(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

router.get('/employer', requireUser, (req, res) => {
  res.render('employer-dashboard', { user: req.session.user });
});

router.get('/craftsman', requireUser, (req, res) => {
  res.render('craftsman-dashboard', { user: req.session.user });
});

module.exports = router;
