const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Use the frontend URL from environment variables to redirect
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'; // Default to localhost if not set
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

// Get current user
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

module.exports = router;
