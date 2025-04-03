const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: isProduction ? 'https://upscpath.netlify.app' : 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.set('trust proxy', 1);

// Connect to MongoDB
connectDB();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const s3 = new AWS.S3();
const polly = new AWS.Polly();

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
      secure: isProduction,
      httpOnly: true,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Debug session (optional, remove in production)
app.use((req, res, next) => {
  if (!isProduction) {
    console.log('Session ID:', req.sessionID);
    console.log('Session:', req.session);
  }
  next();
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/summary', summaryRoutes);

// Logout route
app.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err.message });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to destroy session', error: err.message });
      }

      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
      });

      return res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

// Fetch signed URL for PDF (kept for potential future use)
app.get('/book-url', async (req, res) => {
  const { book } = req.query;
  if (!book) return res.status(400).json({ error: 'Book parameter is required' });

  console.log('Received book parameter:', book);

  const parts = book.split(' ');
  if (parts.length < 2) return res.status(400).json({ error: 'Invalid book format' });

  const subject = parts[0].toUpperCase();
  const classDetails = parts.slice(1).join(' ');

  const classMatch = classDetails.match(/Class (\d+)(?:\s+(Part\s+(\d+)|India|World))?/i);
  if (!classMatch) return res.status(400).json({ error: 'Invalid class format' });

  const classNumber = classMatch[1];
  const suffixRaw = classMatch[2];

  let suffix = '';
  if (suffixRaw) {
    if (suffixRaw.startsWith('Part')) {
      const partNumber = parseInt(suffixRaw.replace('Part ', ''), 10);
      const romanMap = { 1: 'i', 2: 'ii', 3: 'iii' };
      suffix = romanMap[partNumber] || '';
    } else {
      suffix = `-${suffixRaw.toLowerCase()}`;
    }
  }

  const key = `NCERT/${subject}/${classNumber}${suffix}.pdf`;
  console.log('Generated S3 key:', key);

  const params = {
    Bucket: 'path-study-material',
    Key: key,
    Expires: 3600, // URL expires in 1 hour
  };

  try {
    const url = await s3.getSignedUrlPromise('getObject', params);
    res.json({ url });
  } catch (err) {
    console.error('Error generating signed URL:', err);
    res.status(500).json({ error: 'Failed to fetch book URL', details: err.message });
  }
});

// Handle Polly synthesis
app.post('/synthesize-speech', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  const params = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Joanna',
  };

  try {
    const data = await polly.synthesizeSpeech(params).promise();
    res.set('Content-Type', 'audio/mp3');
    res.send(data.AudioStream);
  } catch (error) {
    console.error('Error with Polly:', error);
    res.status(500).json({ error: 'Failed to synthesize speech', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong on the server', details: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
);