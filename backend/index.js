const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const MongoStore = require('connect-mongo');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:3000', 'https://upscpath.netlify.app'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'None',
    },
  })
);

// ✅ Initialize Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/summary', require('./routes/summarizeRoute'));

// ✅ Health Check Route (for debugging deployment issues)
app.get('/health', (req, res) => {
  res.json({ status: '✅ Server is running', time: new Date().toISOString() });
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Global Error Handler:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));