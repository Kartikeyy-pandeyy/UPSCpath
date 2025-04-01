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
    origin: 'https://upscpath.netlify.app',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Session store setup
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions', // Explicit collection name
  ttl: 24 * 60 * 60, // 1 day in seconds
  autoRemove: 'native', // Automatically remove expired sessions
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
      secure: true, // HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'none', // Cross-site cookies
      httpOnly: true, // Prevent client-side access
      path: '/', // Ensure cookie is available site-wide
    },
  })
);

// Passport middleware (must come after session)
app.use(passport.initialize());
app.use(passport.session());

// Debug middleware to log session on every request
app.use((req, res, next) => {
  console.log('Request session:', JSON.stringify(req.session, null, 2));
  next();
});

// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/summary', summaryRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));