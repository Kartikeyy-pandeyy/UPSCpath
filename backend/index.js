const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const MongoStore = require('connect-mongo');
const cors = require('cors');

dotenv.config();

// ✅ Connect to MongoDB with error handling
(async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
    process.exit(1); // Exit process if DB connection fails
  }
})();

const app = express();
app.use(express.json());

// ✅ CORS Configuration: Dynamically handles production & local environments
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000'];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Session Management with Secure Cookies in Production
try {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'default_secret',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 14 * 24 * 60 * 60, // 14 days
      }),
      cookie: {
        secure: process.env.NODE_ENV === 'production', // Secure cookies only in production
        httpOnly: true,
        sameSite: 'Lax', // Helps with session security
      },
    })
  );
  console.log('✅ Session Store Initialized');
} catch (error) {
  console.error('❌ Error setting up MongoStore:', error);
}

// ✅ Initialize passport authentication
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/summary', require('./routes/summarizeRoute'));

// ✅ Global Error Handler: More detailed & structured
app.use((err, req, res, next) => {
  console.error('❌ Global Error Handler:', err.stack || err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
