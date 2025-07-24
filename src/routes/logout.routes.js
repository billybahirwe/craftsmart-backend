// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();

// GET /logout
router.get('/logout', (req, res) => {
  // If using session-based auth
  req.session?.destroy(() => {
    res.redirect('/login'); // or wherever you want to send users after logout
  });

  // If using token-based auth (e.g., JWT), you'd just instruct client to delete token
});

module.exports = router;
