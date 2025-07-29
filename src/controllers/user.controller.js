const User = require('../models/user');

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Get single user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Update user
exports.updateUserProfile = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};

// 🔥 Register User - NEW FUNCTION
exports.registerUser = async (req, res, next) => {
  try {
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
      bio
    } = req.body;

    console.log("Register data:", req.body);

    const user = new User({
      username,
      email: email || undefined,
      password, // You should hash this in production!
      role,
      mobileNumber,
      location: `${region}, ${district}, ${city}`,
      skills: skills ? skills.split(',').map(s => s.trim()) : [],
      bio
    });

    await user.save();
    res.redirect('/login'); // or wherever you want to redirect
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send('Registration failed');
  }
};
