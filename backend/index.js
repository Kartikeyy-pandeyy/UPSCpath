const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const MongoStore = require('connect-mongo');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const cors = require('cors');

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://upscpath.netlify.app'], // Allow local & production frontend
    credentials: true, // Allow credentials (cookies/sessions)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly allow HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  })
);


// ✅ Improved session store handling
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
      cookie: { secure: false, httpOnly: true },
    })
  );
} catch (error) {
  console.error('❌ Error setting up MongoStore:', error);
}

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/summary', require('./routes/summarizeRoute'));

// ✅ Improved error handler with detailed logging
app.use((err, req, res, next) => {
  console.error('❌ Global Error Handler:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  