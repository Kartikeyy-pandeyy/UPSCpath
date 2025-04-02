import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Popup from './Popup';
import './StudyMaterial.css';

const StudyMaterial = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' },
  };

  const ncertSubjects = [
    { title: 'SCIENCE', books: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'] },
    { title: 'SOCIOLOGY', books: ['Class 11', 'Class 12'] },
    {
      title: 'POLITY',
      books: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12 India', 'Class 12 World'],
    },
    {
      title: 'HISTORY',
      books: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12 Part 1', 'Class 12 Part 2', 'Class 12 Part 3'],
    },
    {
      title: 'GEOGRAPHY',
      books: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    },
    {
      title: 'ECONOMICS',
      books: ['Class 9', 'Class 10', 'Class 11', 'Class 12 Part 1', 'Class 12 Part 2'],
    },
    { title: 'ART & CULTURE', books: ['Class 11', 'Class 12'] },
  ];

  const otherSections = [
    { title: 'Standard Reference Books', description: 'Advanced study material for each subject' },
    { title: 'Current Affairs Resources', description: 'Daily news analysis and monthly magazines' },
    { title: 'Optional Subject Materials', description: 'Specialized resources for chosen optional subjects' },
  ];

  const handleViewContent = (subject) => {
    setSelectedSubject(subject);
  };

  const handleClosePopup = () => {
    setSelectedSubject(null);
  };

  return (
    <div className="study-material-wrapper">
      <motion.h2
        className="material-title"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        UPSC Study Material Resources
      </motion.h2>

      <motion.section
        className="resource-section"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="section-title">NCERT Books (Foundation)</h3>
        <p className="section-description">
          Essential NCERT textbooks for UPSC preparation across all subjects
        </p>

        <div className="subject-grid">
          {ncertSubjects.map((subject, index) => (
            <motion.div
              key={subject.title}
              className="subject-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="subject-title">{subject.title}</h4>
              <ul className="book-list">
                {subject.books.map((book) => (
                  <li key={book}>{book}</li>
                ))}
              </ul>
              <motion.button
                className="view-content-btn"
                onClick={() => handleViewContent(subject)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Content
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {otherSections.map((section, index) => (
        <motion.section
          key={section.title}
          className="coming-soon-section"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 + index * 0.2 }}
        >
          <h3 className="section-title">{section.title}</h3>
          <p className="section-description">{section.description}</p>
          <div className="coming-soon">Section Coming Soon</div>
        </motion.section>
      ))}

      {selectedSubject && (
        <Popup subject={selectedSubject} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default StudyMaterial;