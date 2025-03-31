const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const MongoStore = require('connect-mongo');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// CORS configuration for handling cross-origin requests
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://upscpath.netlify.app'], // Frontend URLs
    credentials: true, // Allow credentials (cookies/sessions)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  })
);

// Session store setup
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
      secure: process.env.NODE_ENV === 'production', // Set to true for https (in production)
      httpOnly: true,
      sameSite: 'None', // Important for cross-origin requests
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/authRoutes'));
app.use('/summary', require('./routes/summarizeRoute'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
