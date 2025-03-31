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

// ✅ CORS Configuration (Allow Frontend Access with Credentials)
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://upscpath.netlify.app'], // Allowed Frontend URLs
    credentials: true, // ✅ Allow cookies and authentication headers
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Session Configuration (Improved for Production & Cross-Origin Support)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60, // Sessions last for 14 days
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Secure cookies in production
      httpOnly: true, // Prevent XSS attacks
      sameSite: 'None', // ✅ Allow cross-origin requests
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