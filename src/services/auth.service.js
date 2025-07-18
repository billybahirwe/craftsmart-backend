const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (mobileNumber, password, role) => {
  const existingUser = await User.findOne({ mobileNumber });
  if (existingUser) throw new Error('User already exists');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ mobileNumber, passwordHash, role, approved: role === 'admin' });

  await user.save();
  return user;
};

exports.login = async (mobileNumber, password) => {
  const user = await User.findOne({ mobileNumber });
  if (!user) throw new Error('User not found');

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) throw new Error('Invalid password');

  if (!user.approved) throw new Error('Account not approved yet');

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { user, token };
};
