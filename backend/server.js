require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const { getViews, incrementViews } = require("./portfolio"); 
const passport = require('./config/passport');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const AWS = require('aws-sdk');
const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(express.json());

// CORS configuration
const allowlist = process.env.NODE_ENV === "production"
  ? [
      "https://upscpath.netlify.app",
      "https://kartikeyypandeyy.netlify.app", // your portfolio prod
    ]
  : [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowlist.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.set('trust proxy', 1);

// DB first
connectDB();

// AWS SDK config (unchanged)
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});
const s3 = new AWS.S3();
const polly = new AWS.Polly();

// Sessions BEFORE passport
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions',
  ttl: 24 * 60 * 60,
  autoRemove: 'native',
});
sessionStore.on('error', (error) => console.error('Session store error:', error));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: isProduction ? true : false,
      httpOnly: true,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Initialize Passport AFTER session
app.use(passport.initialize());
app.use(passport.session());

// Debug AFTER passport so req.user is populated
app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('User:', req.user);
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/summary', summaryRoutes);

// Simple healthcheck BEFORE 404
app.get('/api/ping', (req, res) => {
  res.status(200).send('OK');
});

// Views counters (unchanged)
app.get("/api/views", async (req, res) => {
  try { const total = await getViews(); res.json({ total }); }
  catch (err) { console.error("GET /api/views error:", err); res.status(500).json({ error: "Failed to fetch views" }); }
});
app.post("/api/views", async (req, res) => {
  try { const total = await incrementViews(); res.json({ total }); }
  catch (err) { console.error("POST /api/views error:", err); res.status(500).json({ error: "Failed to increment views" }); }
});

// Logout (unchanged)
app.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed', error: err.message });
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: 'Failed to destroy session', error: err.message });
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

// Signed URL builder — add hyphen for Part I/II/III
app.get('/book-url', async (req, res) => {
  const { book } = req.query;
  if (!book) return res.status(400).json({ error: 'Book parameter is required' });

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
      const partNumber = parseInt(classMatch[3], 10);
      const romanMap = { 1: 'i', 2: 'ii', 3: 'iii' };
      const roman = romanMap[partNumber] || '';
      suffix = roman ? `-${roman}` : '';   // <-- hyphen added here
    } else {
      suffix = `-${suffixRaw.toLowerCase()}`; // -india / -world
    }
  }

  const key = `NCERT/${subject}/${classNumber}${suffix}.pdf`;

  try {
    const url = await s3.getSignedUrlPromise('getObject', { Bucket: 'path-study-materials', Key: key, Expires: 3600 });
    res.json({ url });
  } catch (err) {
    console.error('Error generating signed URL:', err);
    res.status(500).json({ error: 'Failed to fetch book URL', details: err.message });
  }
});

// Polly (unchanged)
app.post('/synthesize-speech', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  try {
    const data = await polly.synthesizeSpeech({ Text: text, OutputFormat: 'mp3', VoiceId: 'Joanna' }).promise();
    res.set('Content-Type', 'audio/mp3');
    res.send(data.AudioStream);
  } catch (error) {
    console.error('Error with Polly:', error);
    res.status(500).json({ error: 'Failed to synthesize speech', details: error.message });
  }
});

// 404 handler AFTER all routes
app.use((req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Error handler LAST
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong on the server', details: err.message });
});

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
);