const express = require('express');
const router = express.Router();
const Craftsman = require('../models/craftsman');

// ✅ Test route to verify router is working
router.get('/test', (req, res) => {
  res.send('✅ Craftsman router is working');
});

// ✅ POST /api/craftsman/dashboard - Save a new craftsman profile
router.post('/dashboard', async (req, res) => {
  console.log('📥 POST /api/craftsman/dashboard hit');

  try {
    const { name, phone, location, bio, skills } = req.body;

    // Basic validation (optional)
    if (!name || !phone || !location || !bio || !skills) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newCraftsman = new Craftsman({
      name,
      phone,
      location,
      bio,
      skills: Array.isArray(skills) ? skills : [skills],
    });

    await newCraftsman.save();
    console.log('✅ Craftsman saved to DB');

    res.status(201).json({ success: true, message: 'Profile saved!' });
  } catch (err) {
    console.error('❌ Error saving craftsman:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
