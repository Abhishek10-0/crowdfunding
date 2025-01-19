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


app.post('/api/users/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
 
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed', details: error.message });
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
