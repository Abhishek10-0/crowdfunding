const express = require('express');
const { signIn } = require('../controllers/authController'); // Import the controller logic
const router = express.Router();


router.post('/signin', signIn);

const express = require('express');
const jwt = require('jsonwebtoken');

router.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    // Generate a new access token
    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken: newAccessToken });
  });
});

module.exports = router;


