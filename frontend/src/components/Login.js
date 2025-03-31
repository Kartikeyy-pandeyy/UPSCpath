import React from 'react';
import './Login.css';
import { FaGoogle, FaBookReader } from 'react-icons/fa';
import { motion } from 'framer-motion'; // For animations

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'https://upscpath.railway.internal:5000/auth/google';
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
        >
          <FaGoogle className="google-icon" />
          Continue with Google
        </motion.button>

        <div className="features">
          <motion.div
            className="feature-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="feature-icon">📚</span>
            <span>Comprehensive Study Material</span>
          </motion.div>
          <motion.div
            className="feature-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="feature-icon">⚡</span>
            <span>AI-Powered Summaries</span>
          </motion.div>
          <motion.div
            className="feature-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span className="feature-icon">🎯</span>
            <span>Exam-Focused Content</span>
          </motion.div>
        </div>

        <p className="footer-text">
          Made by Kartikey Pandey
        </p>
      </motion.div>
    </div>
  );
};

export default Login;