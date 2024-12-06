const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Account } = require('../schema');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userRole } = req.body;

    // Log the incoming request body for debugging
    console.log('Request Body:', req.body);

    // Validate required fields
    if (!userName || !userEmail || !userPassword || !userRole) {
      return res.status(400).json({ message: '⚠️ All fields are required.' });
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(userEmail)) {
      return res.status(400).json({ message: '⚠️ Invalid email address.' });
    }

    // Check if the user already exists
    const userExists = await Account.findOne({ where: { userEmail } });
    if (userExists) {
      return res.status(400).json({ message: '⚠️ User already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Create the new user
    const newUser = await Account.create({
      userName,
      userEmail,
      userPassword: hashedPassword,
      userRole
    });

    // Send success response
    res.status(201).json({ message: '🎉 Account created successfully!', data: newUser });

  } catch (error) {
    console.error('🚨 Registration error:', error.message, error.stack);
    res.status(500).json({ message: '❌ Internal server error.' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const user = await Account.findOne({ where: { userEmail: req.body.userEmail } });

    if (!user) {
      return res.status(404).json({ message: '⚠️ User does not exist.', success: false });
    }

    const validPassword = await bcrypt.compare(req.body.userPassword, user.userPassword);
    if (!validPassword) {
      return res.status(401).json({ message: '❌ Incorrect password.', success: false });
    }

    const token = jwt.sign({ userId: user.id, role: user.userRole }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' });
    res.status(200).json({ message: '✅ Login successful.', success: true, data: token });
  } catch (error) {
    res.status(500).json({ message: '🚨 Internal server error.', success: false });
  }
});

module.exports = router;
