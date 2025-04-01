import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Dashboard.css';
import { 
  FaBook, 
  FaSignOutAlt, 
  FaSpinner, 
  FaCopy, 
  FaTrash,
  FaClipboardList,
  FaGraduationCap,
  FaQuestionCircle
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ user, setUser }) => {
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('summary');
  const navigate = useNavigate();

  const backendURL = process.env.REACT_APP_BACKEND_URL || 'https://upscpath-production.up.railway.app';

  // Verify authentication status on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch(`${backendURL}/auth/me`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Not authenticated');
        }

        const userData = await response.json();
        
        if (!userData || !userData.id) {
          throw new Error('Invalid user data');
        }

        if (!user || user.id !== userData.id) {
          setUser(userData);
        }
      } catch (error) {
        if (user) {
          setUser(null);
        }
        navigate('/');
      } finally {
        setAuthChecking(false);
      }
    };

    verifyAuth();
  }, [backendURL, navigate, setUser, user]);

  const handleSummarize = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    try {
      const { data } = await api.post('/summary/summarize', { text: topic });
      if (data?.summary) {
        let formattedSummary = data.summary.replace(/^Summarize the following.*?\n\n"/, "");
        const bulletPoints = formattedSummary.split("- ").filter(point => point.trim() !== "");
        setSummary(bulletPoints);
        setActiveTab('summary');
      } else {
        setSummary(['No summary returned from the server.']);
      }
    } catch (error) {
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
      setUser(null);
      localStorage.clear();
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      navigate('/');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSummarize();
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

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            <FaBook /> Summary
          </button>
          <button 
            className={`tab-btn ${activeTab === 'exam' ? 'active' : ''}`}
            onClick={() => setActiveTab('exam')}
          >
            <FaClipboardList /> Exam Pattern
          </button>
          <button 
            className={`tab-btn ${activeTab === 'material' ? 'active' : ''}`}
            onClick={() => setActiveTab('material')}
          >
            <FaGraduationCap /> Study Material
          </button>
          <button 
            className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            <FaQuestionCircle /> FAQs
          </button>
        </div>

        {activeTab === 'summary' && (
          <>
            {summary.length > 0 ? (
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
            ) : (
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
          </>
        )}

        {activeTab === 'exam' && (
          <section className="content-section">
            <h2>UPSC Exam Pattern</h2>
            <div className="content-card">
              <h3>Preliminary Examination</h3>
              <p>Objective type questions testing general awareness</p>
              <ul>
                <li>Paper I: General Studies</li>
                <li>Paper II: CSAT (Qualifying)</li>
              </ul>
            </div>
            <div className="content-card">
              <h3>Main Examination</h3>
              <p>Descriptive papers testing in-depth knowledge</p>
              <ul>
                <li>9 papers including Essay, GS I-IV, Optional Subjects</li>
              </ul>
            </div>
            <div className="content-card">
              <h3>Personality Test (Interview)</h3>
              <p>275 marks assessing mental caliber and personality traits</p>
            </div>
          </section>
        )}

        {activeTab === 'material' && (
          <section className="content-section">
            <h2>Study Material Resources</h2>
            <div className="content-grid">
              <div className="resource-card">
                <h3>NCERT Books</h3>
                <p>Foundation for all subjects (Class 6-12)</p>
                <button className="resource-btn">View Resources</button>
              </div>
              <div className="resource-card">
                <h3>Standard Reference Books</h3>
                <p>Advanced study material for each subject</p>
                <button className="resource-btn">View Resources</button>
              </div>
              <div className="resource-card">
                <h3>Current Affairs</h3>
                <p>Daily news analysis and monthly magazines</p>
                <button className="resource-btn">View Resources</button>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'faq' && (
          <section className="content-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>What is the eligibility criteria for UPSC?</h3>
                <p>Bachelor's degree from recognized university. Age limit varies by category (21-32 years for General).</p>
              </div>
              <div className="faq-item">
                <h3>How many attempts are allowed?</h3>
                <p>General: 6, OBC: 9, SC/ST: Unlimited until age limit.</p>
              </div>
              <div className="faq-item">
                <h3>What is the best optional subject?</h3>
                <p>Choose based on interest and background. Popular options include Public Administration, Geography, Sociology.</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </motion.div>
  );
};

export default Dashboard;