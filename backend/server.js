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

app.use(express.json());

app.use(
  cors({
    origin: 'https://upscpath.netlify.app',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      secure: true, // HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'none', // Cross-site cookies
      httpOnly: true, // Prevent client-side access
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use('/auth', authRoutes);
app.use('/summary', summaryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));