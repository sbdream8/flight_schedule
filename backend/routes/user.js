const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// Fetch user profile
router.get('/user', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user data.' });
  }
});

// Update user profile
router.put('/user', authenticate, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // Hash password before saving in production

    await user.save();
    res.json({ message: 'Profile updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user data.' });
  }
});

module.exports = router;
