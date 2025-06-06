const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./userModel');

const app = express();
const JWT_SECRET = 'your_jwt_secret_here';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auth_demo', {
  useNewUrlParser: true, useUnifiedTopology: true
});

// Register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({ username });
  if (userExist) return res.status(400).json({ message: 'Username taken' });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.json({ message: 'User registered!' });
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route example
app.get('/api/profile', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));