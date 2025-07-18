// routes/craftsman.js
const express = require('express');
const router = express.Router();
const Craftsman = require('../models/craftsman');

router.post('/dashboard', async (req, res) => {
  try {
    const { name, phone, location, bio, skills } = req.body;

    const newCraftsman = new Craftsman({
      name,
      phone,
      location,
      bio,
      skills: Array.isArray(skills) ? skills : [skills] // handle single/multiple selection
    });

    await newCraftsman.save();
    res.status(201).json({ success: true, message: 'Profile saved!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
