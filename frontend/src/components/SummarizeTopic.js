import React, { useState } from 'react';
import api from '../services/api';
import { FaSpinner, FaCopy, FaTrash, FaLightbulb, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './SummarizeTopic.css';

const suggestedTopics = [
  'Indian Constitution', 'Fundamental Rights', 'Directive Principles',
  'Climate Change in India', 'Environmental Policies', 'Sustainable Development',
  'Economic Reforms', 'Liberalization', 'Privatization', 'Globalization',
  'Modern Indian History', 'Freedom Struggle', 'Partition of India',
  'International Relations', 'India-US Relations', 'India-China Relations',
  'Indian Polity', 'Parliamentary System', 'Judicial System',
  'Science and Technology', 'Space Program', 'Nuclear Technology',
  'Social Issues', 'Poverty Alleviation', 'Education System',
  'Agriculture Sector', 'Land Reforms', 'Green Revolution',
  'Governance', 'E-Governance', 'Administrative Reforms'
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }
};

const SummarizeTopic = ({ user, setUser }) => {
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSummarize = async () => {
    if (!topic.trim()) return setErrorMessage('Please enter a topic to summarize!');
    
    setLoading(true);
    setErrorMessage('');
    try {
      const { data } = await api.post('/summary/summarize', { text: topic });
      setSummary(data?.summary?.split('\n').filter(Boolean) || ['No summary available.']);
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
        navigate('/');
      } else {
        setErrorMessage('Oops! Something went wrong. Try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div className="summarize-page" variants={containerVariants} initial="hidden" animate="visible">
      <div className="content-wrapper">
        <motion.h2 variants={itemVariants} className="section-title">UPSC Topic Summarizer</motion.h2>
        <motion.p variants={itemVariants} className="section-subtitle">Get instant, AI-powered summaries for your exam preparation</motion.p>
        
        <motion.div variants={itemVariants} className="input-container">
          <div className="input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSummarize()}
              placeholder="Type a UPSC topic, e.g., Fundamental Rights"
              className="topic-input"
            />
          </div>
          <motion.button className="summarize-btn" onClick={handleSummarize} disabled={loading} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            {loading ? <><FaSpinner className="spinner" /> Processing...</> : 'Generate Summary'}
          </motion.button>
        </motion.div>

        <AnimatePresence>{errorMessage && <motion.div className="error-message" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>{errorMessage}</motion.div>}</AnimatePresence>

        <AnimatePresence mode="wait">
          {summary.length > 0 ? (
            <motion.div className="summary-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <div className="summary-box">
                {summary.map((point, index) => <motion.p key={index} className="summary-line" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>{point}</motion.p>)}
              </div>
              <div className="summary-actions">
                <motion.button className="copy-btn" onClick={handleCopy} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}><FaCopy /> {copied ? 'Copied!' : 'Copy Summary'}</motion.button>
                <motion.button className="clear-btn" onClick={() => { setSummary([]); setTopic(''); }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}><FaTrash /> Clear</motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div className="welcome-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <motion.p className="welcome-text" variants={itemVariants}>Start by entering a topic or try one of these important UPSC topics:</motion.p>
              <div className="suggested-topics">
                {suggestedTopics.map((topicName) => (
                  <motion.button key={topicName} className="suggested-btn" onClick={() => setTopic(topicName)} whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }} whileTap={{ scale: 0.97 }}><FaLightbulb className="bulb-icon" /> {topicName}</motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>{copied && <motion.div className="copied-notification" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>Summary copied to clipboard!</motion.div>}</AnimatePresence>
    </motion.div>
  );
};

export default SummarizeTopic;
