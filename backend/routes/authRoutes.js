const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/`, // Default to local for testing
    failureMessage: true,
  }),
  (req, res) => {
    // Successful authentication
    console.log('Successful authentication, user:', req.user);

    // Set a flag in session to indicate successful auth
    req.session.authenticated = true;

    // Redirect to frontend dashboard
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard`);
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
      }
      res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000');
    });
  });
});

router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    // Return minimal user data needed by frontend
    const userData = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };
    res.json(userData);
  } else {
    res.status(401).json({
      error: 'Not authenticated',
      authUrl: '/auth/google',
    });
  }
});

module.exports = router;