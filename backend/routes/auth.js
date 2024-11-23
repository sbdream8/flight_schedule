const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

module.exports = router;
