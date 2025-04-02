const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
require('dotenv').config();

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: isProduction
      ? 'https://upscpath.netlify.app'
      : 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.set('trust proxy', 1);

// Connect to MongoDB first
connectDB();

// Session store setup
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions',
  ttl: 24 * 60 * 60,
  autoRemove: 'native',
});

sessionStore.on('error', (error) => {
  console.error('Session store error:', error);
});

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: isProduction, // Ensure secure cookies in production
      httpOnly: true,
      sameSite: 'none', // Required for cross-origin session sharing
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Debug session before Passport
app.use((req, res, next) => {
  console.log('Raw session from store:', JSON.stringify(req.session, null, 2));
  next();
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Debug session after Passport
app.use((req, res, next) => {
  console.log('Session after Passport:', JSON.stringify(req.session, null, 2));
  console.log('User after Passport:', req.user || 'undefined');
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/summary', summaryRoutes);

app.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to destroy session' });
      }

      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: isProduction, // Must be secure in production
        sameSite: 'none', // Important for cross-origin cookies
      });

      res.setHeader('Access-Control-Allow-Origin', isProduction ? 'https://upscpath.netlify.app' : 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Credentials', 'true');

      return res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
);