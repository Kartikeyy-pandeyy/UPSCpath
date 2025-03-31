const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Dynamically set the frontend URL based on environment
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/dashboard`);
  }
);


// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'; // Default to localhost if not set
    res.redirect(frontendUrl);
  });
});

router.get('/me', (req, res) => {
  console.log("Session user:", req.user); // ✅ Debugging line to check session data

  if (req.isAuthenticated()) {
    return res.json(req.user);
  } else {
    return res.status(401).json({ error: 'Not authenticated' });
  }
});


module.exports = router;
