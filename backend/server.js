const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User'); // Import User model

const app = express();
const PORT = process.env.PORT || 5001;

const mongoURI = 'mongodb+srv://abhishekchoudhary162004:TwlvJCmCfqp9vppG@cluster0.btusf.mongodb.net/myDatabase?retryWrites=true&w=majority';

// Middleware
app.use(bodyParser.json()); // To parse incoming JSON data
app.use(cors());            // Enable Cross-Origin Resource Sharing

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// POST route to handle user signup
app.post('/api/users/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
