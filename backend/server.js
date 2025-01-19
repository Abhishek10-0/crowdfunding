const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path'); 
const User = require('./models/User'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // If you want to allow cookies
}));


app.use(bodyParser.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const mongoURI = process.env.MONGO_URI || 'your-default-mongodb-uri';


mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));



app.post('/api/users/signin', async (req, res) => {
  console.log('Sign-In request received');
  const { email, password } = req.body;
  console.log('Email:', email, 'Password:', password); 

  try {

    const user = await User.findOne({ email });
    console.log(user); 

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password validation:', isPasswordValid); 
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials!' });
    }

    
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


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ storage });


const Project = require('./models/Project'); 

app.post('/api/projects', upload.single('image'), async (req, res) => {
  try {
    const { name, duration, description, goal } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !duration || !description || !goal || !image) {
      return res.status(400).json({ message: 'All fields, including an image, are required.' });
    }

   
    const newProject = new Project({ name, duration, description, goal, image });
    const savedProject = await newProject.save();

    res.status(201).json({ message: 'Project created successfully!', project: savedProject });
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).json({ message: 'Failed to create project.', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
