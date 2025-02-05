const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validatePassword(password))) {
      throw new Error('Invalid login credentials');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  res.json(req.user);
});

module.exports = router; 