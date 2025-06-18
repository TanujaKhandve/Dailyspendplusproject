const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure you have User model
const authMiddleware = require('../middleware/authMiddleware');

// ✅ GET current user info
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' }); // ✅ prevent null return
    res.json(user); // ✅ return user object
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


// ✅ PUT update name/email
router.put('/update-profile', authMiddleware, async (req, res) => {
  const { name, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, email },
      { new: true }
    ).select('-password');

    res.json({ msg: 'Profile updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: 'Update failed' });
  }
});


// ✅ PUT change password
router.put('/change-password', authMiddleware, async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ msg: 'Password too short' });
  }

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.userId, { password: hashed });
    res.json({ msg: 'Password changed' });
  } catch (err) {
    res.status(500).json({ msg: 'Password update failed' });
  }
});


module.exports = router;
