const express = require('express');
const { signIn } = require('../controllers/authController'); // Import the controller logic
const router = express.Router();

// POST: Sign-In Route
router.post('/signin', signIn);

module.exports = router;
