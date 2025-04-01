const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: process.env.FRONTEND_URL }),
  (req, res) => {
    if (!req.user) {
      console.error('Authentication failed, no user');
      return res.redirect(process.env.FRONTEND_URL);
    }
    console.log('Callback reached');
    console.log('User after callback:', req.user);
    console.log('Session before save:', JSON.stringify(req.session, null, 2));

    // Ensure session is saved
    req.session.save((err) => {
      if (err) {
        console.error('Error saving session:', err);
        return res.redirect(process.env.FRONTEND_URL);
      }
      console.log('Session after save:', JSON.stringify(req.session, null, 2));
      res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    });
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.error('Logout error:', err);
    res.redirect(process.env.FRONTEND_URL);
  });
});

router.get('/me', (req, res) => {
  console.log('Manual passport check:', req.session.passport);
  if (!req.session.passport && req.session.user) {
    req.session.passport = { user: req.session.user };
  }
  console.log('GET /auth/me - Session:', JSON.stringify(req.session, null, 2));
  console.log('GET /auth/me - User:', req.user);
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

module.exports = router;