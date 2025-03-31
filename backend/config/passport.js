const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();

// Ensure callback URL is correctly set from environment variables
const callbackURL = process.env.GOOGLE_CALLBACK_URL || 'https://upscpath-production.up.railway.app/auth/google/callback';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error("❌ Google OAuth credentials are missing in environment variables.");
  process.exit(1);
}

console.log("✅ Using Google OAuth Callback URL:", callbackURL);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL, // Use dynamically set callback URL from env
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const email = profile.emails?.[0]?.value;

          if (!email) {
            console.error("❌ No email found in Google profile.");
            return done(null, false, { message: "Email not found in Google profile" });
          }

          const existingUser = await User.findOne({ email });

          if (existingUser) {
            console.warn(`⚠️ Email already exists: ${email}`);
            return done(null, existingUser); // Use existing user
          }

          // Create a new user
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: email,
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
  console.log('Serializing user:', user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log('Deserialized user:', user);
    if (!user) return done(null, false);
    done(null, user);
  } catch (error) {
    console.error('Error in deserializing user:', error);
    done(error, null);
  }
});

// Deserialize user from session
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