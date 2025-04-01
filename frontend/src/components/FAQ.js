import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // FAQ data organized as an array of objects
  const faqData = [
    {
      question: "What is the eligibility criteria for UPSC?",
      answer: "To appear for UPSC CSE, candidates must hold a bachelor's degree from any recognized university. The age limit is 21-32 years for General category (as of August 1 of exam year), with relaxations of 5 years for SC/ST, 3 years for OBC, and 10 years for PwBD candidates. There are also nationality requirements - Indian citizenship is mandatory for IAS/IPS, while some services allow Nepalese/Bhutanese citizens.",
      category: "Eligibility"
    },
    {
      question: "How many attempts are allowed?",
      answer: "The number of attempts varies by category: General category candidates get 6 attempts, OBC candidates (non-creamy layer) get 9 attempts, while SC/ST candidates have unlimited attempts until they reach the upper age limit. For Persons with Benchmark Disabilities (PwBD), General/OBC get 9 attempts and SC/ST PwBD have no limit. An attempt is counted only if you appear for at least one paper in Prelims.",
      category: "Attempts"
    },
    {
      question: "What is the best optional subject?",
      answer: "The 'best' optional subject depends on your academic background and interest. Popular choices include Public Administration (overlaps with GS), Geography (scoring with diagrams), Sociology (conceptual), and History (fact-based). Technical subjects like Mathematics can score high if you're comfortable with them. Analyze syllabus overlap, resource availability, and previous years' trends before choosing.",
      category: "Preparation"
    },
    {
      question: "What is the exam pattern for UPSC CSE?",
      answer: "UPSC CSE has three stages: 1) Preliminary Exam (two objective papers - GS and CSAT, qualifying nature), 2) Mains Exam (9 descriptive papers including Essay, GS I-IV, Optional papers, and language papers), and 3) Personality Test (interview). The entire process takes about a year from Prelims notification to final results.",
      category: "Exam Pattern"
    },
    {
      question: "How should I prepare for current affairs?",
      answer: "Focus on 12-18 months of current affairs for Prelims. Read The Hindu/Indian Express editorials daily, follow monthly magazines like Yojana/Kurukshetra, and compile notes by themes (Polity, Economy, Environment). For Mains, connect current events with static syllabus. Use government sources (PIB, PRS) and limit resources to avoid overload.",
      category: "Preparation"
    }
  ];

  // Get all unique categories
  const categories = ['All', ...new Set(faqData.map(item => item.category))];

  // Filter FAQs based on search term and selected category
  const filteredFaqs = faqData.filter(faq => 
    (selectedCategory === 'All' || faq.category === selectedCategory) &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="faq-container">
      <motion.h2 
        className="faq-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Frequently Asked Questions
      </motion.h2>
      
      <motion.div 
        className="faq-search-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="faq-search-input"
        />
        <span className="search-icon">🔍</span>
      </motion.div>

      <motion.div 
        className="category-filter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-tag ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {filteredFaqs.length > 0 ? (
        <div className="faq-list">
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ y: -3 }}
              >
                <div className="faq-header">
                  <h3>{faq.question}</h3>
                  <span className={`faq-category ${faq.category.toLowerCase().replace(' ', '-')}`}>
                    {faq.category}
                  </span>
                </div>
                <p>{faq.answer}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          className="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          No FAQs found matching your search.
        </motion.div>
      )}
    </div>
  );
};

export default FAQ;