const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); // For file uploads
const path = require('path'); // To handle file paths
const User = require('./models/User'); // Import User model
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens
require('dotenv').config(); // For environment variables

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware for CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow this specific origin (React frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // If you want to allow cookies
}));

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Serve static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB URI
const mongoURI = process.env.MONGO_URI || 'your-default-mongodb-uri';

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// POST: User Sign-Up (Existing Code)
app.post('/api/users/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed', details: error.message });
  }
});

// POST: User Sign-In (Existing Code)
app.post('/api/users/signin', async (req, res) => {
  console.log('Sign-In request received');
  const { email, password } = req.body;
  console.log('Email:', email, 'Password:', password); // Check incoming data

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user); // Check the user retrieved from DB

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Validate password using the comparePassword method
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password validation:', isPasswordValid); // Check password comparison result

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials!' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Sign-in successful!',
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error('Error in Sign-In:', error); // Log error details
    return res.status(500).json({ message: 'Something went wrong!', details: error.message });
  }
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Import Project model
const Project = require('./models/Project'); // Ensure this model exists

// POST: Create a new project with an image
app.post('/api/projects', upload.single('image'), async (req, res) => {
  try {
    const { name, duration, description, goal } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !duration || !description || !goal || !image) {
      return res.status(400).json({ message: 'All fields, including an image, are required.' });
    }

    // Create a new project
    const newProject = new Project({ name, duration, description, goal, image });
    const savedProject = await newProject.save();

    res.status(201).json({ message: 'Project created successfully!', project: savedProject });
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).json({ message: 'Failed to create project.', error: error.message });
  }
});

// Health check route
app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
