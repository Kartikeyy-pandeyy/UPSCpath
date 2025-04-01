const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: process.env.FRONTEND_URL }),
  (req, res) => {
    console.log('User authenticated:', req.user);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => res.redirect(process.env.FRONTEND_URL));
});

router.get('/me', (req, res) => {
  console.log('Session:', req.session);
  console.log('User:', req.user);
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

module.exports = router;