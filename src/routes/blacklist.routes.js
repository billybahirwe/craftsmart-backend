const express = require('express');
const router = express.Router();

// Dummy controller handlers (replace with real logic later)
router.get('/', (req, res) => {
  res.json({ message: 'GET all blacklisted users' });
});

router.post('/', (req, res) => {
  res.json({ message: 'POST to add a user to blacklist' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: `DELETE blacklisted user with ID ${req.params.id}` });
});

module.exports = router;
