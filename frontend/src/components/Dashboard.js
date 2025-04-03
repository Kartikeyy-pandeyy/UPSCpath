import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaSpinner, FaBookReader } from 'react-icons/fa';
import './Dashboard.css';
import AboutUPSC from './AboutUPSC';
import ExamPattern from './ExamPattern';
import StudyMaterial from './StudyMaterial';
import SummarizeTopic from './SummarizeTopic';
import FAQ from './FAQ';

const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const Dashboard = ({ user, setUser }) => {
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('summarize');
  const navigate = useNavigate();

  const verifyAuth = useCallback(async () => {
    try {
      const response = await fetch(`${backendURL}/auth/me`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Not authenticated');
      const userData = await response.json();
      if (!userData?.id) throw new Error('Invalid user data');
      setUser((prevUser) => (prevUser?.id !== userData.id ? userData : prevUser));
    } catch {
      setUser(null);
      navigate('/');
    } finally {
      setAuthChecking(false);
    }
  }, [navigate, setUser]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${backendURL}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      await verifyAuth();
    }
  };

  const tabs = [
    { name: 'about', label: 'About UPSC' },
    { name: 'exam', label: 'Exam Pattern' },
    { name: 'summarize', label: 'Summarize Topic' },
    { name: 'material', label: 'Study Material' },
    { name: 'faq', label: 'FAQ' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (authChecking) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" /> Loading Dashboard...
      </div>
    );
  }

  if (!user) return null;

  return (
    <motion.div
      className="dashboard-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-logo">
            <FaBookReader className="logo-icon" />
            <span>UPSCPath</span>
          </div>
          <h1 className="header-greeting">Welcome, {user.name}</h1>
          <motion.button
            className="logout-btn"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt className="logout-icon" /> Sign Out
          </motion.button>
        </div>
      </header>

      <nav className="dashboard-tabs">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <motion.button
              key={tab.name}
              className={`tab-btn ${activeTab === tab.name ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.name)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </nav>

      <main className="dashboard-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="content-wrapper"
          >
            {activeTab === 'about' && <AboutUPSC />}
            {activeTab === 'exam' && <ExamPattern />}
            {activeTab === 'summarize' && <SummarizeTopic user={user} setUser={setUser} />}
            {activeTab === 'material' && <StudyMaterial />}
            {activeTab === 'faq' && <FAQ />}
          </motion.div>
        </AnimatePresence>
      </main>
    </motion.div>
  );
};

export default Dashboard;