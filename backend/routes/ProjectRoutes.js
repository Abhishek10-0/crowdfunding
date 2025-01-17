const express = require('express');
const router = express.Router();
const multer = require('multer');
const Project = require('../models/Project');

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create Project with Image
router.post('/', upload.single('image'), async (req, res) => {
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

module.exports = router;
