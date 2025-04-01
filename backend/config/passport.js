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

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user._id.toString());
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  console.log('Attempting to deserialize user with ID:', id);
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log('User not found for ID:', id);
      return done(null, false);
    }
    console.log('Deserialized user:', user);
    return done(null, user);
  } catch (error) {
    console.error('Error deserializing user:', error);
    return done(error, null);
  }
});

module.exports = passport;