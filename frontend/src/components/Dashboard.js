import React, { useState } from 'react';
import axios from '../services/api';
import './Dashboard.css';
import { FaBook, FaSignOutAlt, FaSpinner, FaCopy, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Dashboard = ({ user }) => {
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  const handleSummarize = async () => {
    if (!topic.trim()) {
      console.error("Error: Topic is empty!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${backendURL}/summary/summarize`, { text: topic });
      let formattedSummary = data.summary.replace(/^Summarize the following.*?\n\n"/, "");
      const bulletPoints = formattedSummary.split("- ").filter(point => point.trim() !== "");
      setSummary(bulletPoints);
    } catch (error) {
      console.error('Summarization failed', error);
      setSummary(['Error fetching summary. Please try again.']);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    window.location.href = `${backendURL}/auth/logout`;
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
            <h1>Hello, {user.name}!</h1>
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
