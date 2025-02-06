const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/auth');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// Ensure database has write permissions
const ensureDatabasePermissions = async () => {
  const dbPath = path.join(__dirname, '../database.sqlite');
  try {
    // Ensure directory has write permissions
    await fs.chmod(path.dirname(dbPath), 0o755);
    
    // If database exists, ensure it has write permissions
    try {
      await fs.access(dbPath);
      await fs.chmod(dbPath, 0o666);
    } catch (err) {
      // File doesn't exist, that's fine
    }
  } catch (error) {
    console.error('Error setting database permissions:', error);
  }
};

// Register
router.post('/register', async (req, res) => {
  try {
    // Ensure database permissions before writing
    await ensureDatabasePermissions();

    const user = await User.create({
      ...req.body,
      role: 'user' // Force regular user role for security
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user.toJSON();

    res.status(201).json({ 
      user: userWithoutPassword, 
      token 
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
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
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.json({ 
      user: userWithoutPassword, 
      token 
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  // Remove password from response
  const { password, ...userWithoutPassword } = req.user.toJSON();
  res.json(userWithoutPassword);
});

module.exports = router; 