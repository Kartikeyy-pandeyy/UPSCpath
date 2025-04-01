const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://upscpath-production.up.railway.app/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('Google profile:', profile);
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          await user.save();
          console.log('New user created:', user);
        } else {
          console.log('Existing user found:', user);
        }
        return done(null, user);
      } catch (error) {
        console.error('Error in GoogleStrategy:', error);
        return done(error, null);
      }
    }
  )
);

// Enhanced serialize/deserialize
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user.id);
  done(null, { 
    id: user.id,
    googleId: user.googleId 
  });
});

passport.deserializeUser(async (obj, done) => {
  try {
    console.log('Deserializing user with ID:', obj.id);
    const user = await User.findById(obj.id);
    if (!user) {
      console.log('User not found');
      return done(null, false);
    }
    console.log('Deserialized user:', user);
    return done(null, user);
  } catch (error) {
    console.error('Deserialization error:', error);
    return done(error);
  }
});

module.exports = passport;