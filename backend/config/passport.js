const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'https://upscpath-production.up.railway.app/auth/google/callback', // Full callback URL for production
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // ✅ Check if email already exists before saving
          const existingUser = await User.findOne({ email: profile.emails[0].value });

          if (existingUser) {
            console.error(`⚠️ Duplicate email detected: ${profile.emails[0].value}`);
            return done(null, existingUser); // Return existing user instead of erroring
          }

          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });

          await user.save();
        }

        done(null, user);
      } catch (error) {
        console.error('❌ Error in Google OAuth:', error);
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) return done(null, false);
    done(null, user);
  } catch (error) {
    console.error('❌ Error in deserializing user:', error);
    done(error, null);
  }
});

module.exports = passport;
