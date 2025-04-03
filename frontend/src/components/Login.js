import React from 'react';
import './Login.css';
import { FaGoogle, FaBookReader } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  const handleLogin = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = `${backendURL}/auth/google`;
  };

  const tabs = [
    { name: 'about', label: 'About UPSC', icon: 'ℹ️' },
    { name: 'exam', label: 'Exam Pattern', icon: '📝' },
    { name: 'summarize', label: 'Summarize Topic', icon: '✂️' },
    { name: 'material', label: 'Study Material', icon: '📚' },
    { name: 'faq', label: 'FAQ', icon: '❓' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
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

          <div className="features-list">
            {tabs.map((tab, index) => (
              <motion.div
                key={tab.name}
                className="feature-item"
                variants={featureVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 6px 12px rgba(37, 99, 235, 0.15)' 
                }}
              >
                <span className="feature-icon">{tab.icon}</span>
                <div className="feature-content">
                  <span className="feature-text">{tab.label}</span>
                  <span className="feature-subtext">
                    {tab.name === 'about' && 'Comprehensive UPSC overview'}
                    {tab.name === 'exam' && 'Detailed exam structure'}
                    {tab.name === 'summarize' && 'Quick topic insights'}
                    {tab.name === 'material' && 'Curated resources'}
                    {tab.name === 'faq' && 'Common questions answered'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="login-button"
            onClick={handleLogin}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)' 
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <FaGoogle className="google-icon" />
            Continue with Google
          </motion.button>

          <footer className="footer">
            <p>Crafted with <span className="heart">❤️</span> by Kartikey Pandey</p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;