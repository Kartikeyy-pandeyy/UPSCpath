const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();

const callbackURL = process.env.GOOGLE_CALLBACK_URL;

if (!callbackURL) {
  console.error("❌ GOOGLE_CALLBACK_URL is not defined in environment variables.");
  process.exit(1); // Stop the server if this critical variable is missing
}

console.log("✅ Using Google OAuth Callback URL:", callbackURL);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL, // Dynamically set callback URL from env
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

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.id);
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
