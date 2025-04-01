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

// Middleware
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: ['https://upscpath.netlify.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.set('trust proxy', 1);

// Connect to MongoDB first (ensures session store can connect)
connectDB();

// Session store setup
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions',
  ttl: 24 * 60 * 60, // 1 day in seconds
  autoRemove: 'native', // Clean up expired sessions
});

sessionStore.on('error', (error) => {
  console.error('Session store error:', error);
});

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true, // Changed to true for better session handling
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
      httpOnly: true,
      path: '/',
      domain: '.railway.app' // Important for cross-subdomain
    },
  })
);

// Debug session before Passport
app.use((req, res, next) => {
  console.log('Raw session from store:', JSON.stringify(req.session, null, 2));
  // Ensure passport data is restored if missing
  if (req.session && req.session.passport && !req.session.passport.user) {
    console.warn('Passport data missing in session, attempting to fix');
  }
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));