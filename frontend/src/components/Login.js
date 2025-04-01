import React from 'react';
import './Login.css';
import { FaGoogle, FaBookReader } from 'react-icons/fa';
import { motion } from 'framer-motion'; // For animations

const Login = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  const handleLogin = () => {
    window.location.href = `${backendURL}/auth/google`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="logo-container">
          <FaBookReader className="logo-icon" />
          <h1>UPSCPath</h1>
        </div>
        <h2>Your AI-Powered UPSC Companion</h2>
        <p className="tagline">Smart summarization for efficient exam preparation</p>

        <motion.button
  className="login-button"
  onClick={handleLogin}
  variants={buttonVariants}
  whileHover="hover"
  whileTap="tap"
  aria-label="Continue with Google"
>
          <FaGoogle className="google-icon" />
          Continue with Google
        </motion.button>

        <div className="features">
          {[
            { icon: '📚', text: 'Comprehensive Study Material', delay: 0.2 },
            { icon: '⚡', text: 'AI-Powered Summaries', delay: 0.4 },
            { icon: '🎯', text: 'Exam-Focused Content', delay: 0.6 }
          ].map(({ icon, text, delay }) => (
            <motion.div
              key={text}
              className="feature-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay, duration: 0.5 }}
            >
              <span className="feature-icon">{icon}</span>
              <span>{text}</span>
            </motion.div>
          ))}
        </div>

        <p className="footer-text">Made by Kartikey Pandey</p>
      </motion.div>
    </div>
  );
};

export default Login;
