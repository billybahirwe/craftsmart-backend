const express = require('express');
const router = express.Router();

// Dummy endpoints — replace with real logic later
router.get('/', (req, res) => {
  res.json({ message: 'GET all messages' });
});

router.post('/', (req, res) => {
  res.json({ message: 'POST new message' });
});

module.exports = router;
