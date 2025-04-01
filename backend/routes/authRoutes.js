const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    failureMessage: true 
  }),
  (req, res) => {
    // Successful authentication
    console.log('Successful authentication, user:', req.user);
    
    // Set a flag in session to indicate successful auth
    req.session.authenticated = true;
    
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);


router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.error('Logout error:', err);
    res.redirect(process.env.FRONTEND_URL);
  });
});

router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    // Return minimal user data needed by frontend
    const userData = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    };
    res.json(userData);
  } else {
    res.status(401).json({ 
      error: 'Not authenticated',
      authUrl: '/auth/google' // Provide auth URL for frontend
    });
  }
});

module.exports = router;