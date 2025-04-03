const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();

// Dynamically set the callback URL based on the environment
const callbackURL =
  process.env.NODE_ENV === 'production'
    ? process.env.CALLBACK_URL_PROD
    : process.env.CALLBACK_URL_DEV || 'http://localhost:5000/auth/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
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

// Serialize user into session
passport.serializeUser((user, done) => {
  console.log('Serializing user with _id:', user._id);
  done(null, user._id.toString()); // Explicitly convert ObjectId to string
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    console.log('Deserializing user with ID:', id);
    // Handle case where id might be an object (due to session corruption)
    const userId = typeof id === 'string' ? id : id._id || id.id;
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found for ID:', userId);
      return done(null, false);
    }
    console.log('Deserialized user:', user);
    return done(null, user);
  } catch (error) {
    console.error('Deserialization error:', error);
    return done(error, null);
  }
});

module.exports = passport;