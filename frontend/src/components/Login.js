// Login.jsx
import React from 'react';
import './Login.css';
import { FaGoogle, FaBookReader } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL || 'https://upscpath-production.up.railway.app';

  const handleLogin = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = `${backendURL}/auth/google`;
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="login-content">
          <div className="branding">
            <FaBookReader className="logo-icon" />
            <h1>UPSCPath</h1>
            <p className="subtitle">Your AI-Powered UPSC Companion</p>
          </div>

          <motion.button
            className="login-button"
            onClick={handleLogin}
            whileHover={{ scale: 1.05, boxShadow: '0 6px 12px rgba(37, 99, 235, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <FaGoogle className="google-icon" />
            Sign in with Google
          </motion.button>

          <div className="features-grid">
            {[
              { icon: '📚', text: 'Curated Study Material' },
              { icon: '⚡', text: 'AI-Driven Insights' },
              { icon: '🎯', text: 'Targeted Prep' },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                className="feature-card"
                variants={featureVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -4, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              >
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-text">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          <footer className="footer">
            <p>Crafted with ❤️ by Kartikey Pandey</p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;