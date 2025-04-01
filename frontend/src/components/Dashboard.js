import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Dashboard.css';
import { FaBook, FaSignOutAlt, FaSpinner, FaCopy, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ user, setUser }) => {
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const navigate = useNavigate();

  const backendURL = process.env.REACT_APP_BACKEND_URL || 'https://upscpath-production.up.railway.app';

  // Verify authentication status on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log('Verifying authentication...');
        const response = await fetch(`${backendURL}/auth/me`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Auth verification response:', response.status);
        
        if (!response.ok) {
          throw new Error('Not authenticated');
        }

        const userData = await response.json();
        console.log('User data received:', userData);
        
        if (!userData || !userData.id) {
          throw new Error('Invalid user data');
        }

        // Only update user if data changed
        if (!user || user.id !== userData.id) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Authentication verification failed:', error);
        // Clear user and redirect only if not already logged out
        if (user) {
          setUser(null);
        }
        navigate('/');
      } finally {
        setAuthChecking(false);
      }
    };

    verifyAuth();

    // Cleanup function
    return () => {
      // Cancel any pending requests if needed
    };
  }, [backendURL, navigate, setUser, user]);

  const handleSummarize = async () => {
    if (!topic.trim()) {
      console.error("Error: Topic is empty!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/summary/summarize', { text: topic });
      if (data?.summary) {
        let formattedSummary = data.summary.replace(/^Summarize the following.*?\n\n"/, "");
        const bulletPoints = formattedSummary.split("- ").filter(point => point.trim() !== "");
        setSummary(bulletPoints);
      } else {
        setSummary(['No summary returned from the server.']);
      }
    } catch (error) {
      console.error('Summarization failed', error);
      if (error.response?.status === 401) {
        setUser(null);
        navigate('/');
      } else {
        setSummary(['Error fetching summary. Please try again.']);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${backendURL}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      
      // Clear client-side state
      setUser(null);
      localStorage.clear();
      sessionStorage.clear();
      
      // Redirect to login
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSummarize();
    }
  };

  const handleCopy = () => {
    const text = summary.join('\n- ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const suggestedTopics = [
    'Indian Constitution',
    'Climate Change in India',
    'Economic Reforms',
  ];

  if (authChecking) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" /> Loading dashboard...
      </div>
    );
  }

  if (!user) {
    return null; // Or redirect to login
  }

  return (
    <motion.div
      className="dashboard-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="dashboard-header">
        <div className="header-content">
          <FaBook className="header-icon" />
          <div>
            <h1>Hello, {user?.name}!</h1>
            <p>Your personalized UPSC preparation hub</p>
          </div>
        </div>
        <motion.button
          className="logout-btn"
          onClick={handleLogout}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaSignOutAlt /> Logout
        </motion.button>
      </header>

      <main className="dashboard-content">
        <section className="input-section">
          <h2>Explore a Topic</h2>
          <div className="input-container">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Indian Polity, Climate Change..."
              className="topic-input"
            />
            <motion.button
              className="summarize-btn"
              onClick={handleSummarize}
              disabled={loading}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {loading ? (
                <>
                  <FaSpinner className="spinner" /> Summarizing...
                </>
              ) : (
                'Generate Summary'
              )}
            </motion.button>
          </div>
        </section>

        {summary.length > 0 && (
          <motion.section
            className="summary-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Summary</h2>
            <ul className="summary-list">
              {summary.map((point, index) => (
                <motion.li
                  key={index}
                  className="summary-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="bullet">●</span>
                  <span>{point.trim()}</span>
                </motion.li>
              ))}
            </ul>
            <div className="summary-actions">
              <motion.button
                className="copy-btn"
                onClick={handleCopy}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaCopy /> {copied ? 'Copied!' : 'Copy Summary'}
              </motion.button>
              <motion.button
                className="clear-btn"
                onClick={() => {
                  setSummary([]);
                  setTopic('');
                }}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaTrash /> Clear Summary
              </motion.button>
            </div>
          </motion.section>
        )}

        {!summary.length && !loading && (
          <section className="welcome-section">
            <h2>Get Started</h2>
            <p>
              Enter a UPSC topic above to receive a concise, AI-generated summary tailored for your preparation.
            </p>
            <div className="suggested-topics">
              <p>Suggested Topics:</p>
              <div className="topic-buttons">
                {suggestedTopics.map((topicName) => (
                  <button key={topicName} onClick={() => setTopic(topicName)}>
                    {topicName}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </motion.div>
  );
};

export default Dashboard;