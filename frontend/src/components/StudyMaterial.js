import React from 'react';
import { motion } from 'framer-motion';
import './StudyMaterial.css';

const StudyMaterial = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }
  };

  const ncertSubjects = [
    {
      title: "SCIENCE",
      books: [
        "Class 6: Science (Basic concepts)",
        "Class 7: Science (Physics, Chemistry fundamentals)",
        "Class 8: Science (Materials, Energy)",
        "Class 9: Science (Matter, Organisms)",
        "Class 10: Science (Chemical reactions, Life processes)",
        "Class 11: Chemistry Part I & II (For Environment section)",
        "Class 12: Biology (Ecology and Environment)"
      ]
    },
    {
      title: "SOCIOLOGY",
      books: [
        "Class 11: Introducing Sociology",
        "Class 12: Indian Society, Social Change and Development in India"
      ]
    },
    {
      title: "POLITY",
      books: [
        "Class 9: Democratic Politics I (Basic concepts)",
        "Class 10: Democratic Politics II (Federalism, Parties)",
        "Class 11: Political Theory, Indian Constitution at Work",
        "Class 12: Contemporary World Politics, Politics in India Since Independence"
      ]
    },
    {
      title: "HISTORY",
      books: [
        "Class 6: Our Past I",
        "Class 7: Our Past II",
        "Class 8: Our Past III",
        "Class 9: India and the Contemporary World I",
        "Class 10: India and the Contemporary World II",
        "Class 11: Themes in World History",
        "Class 12: Themes in Indian History I, II & III"
      ]
    },
    {
      title: "GEOGRAPHY",
      books: [
        "Class 6: The Earth Our Habitat",
        "Class 7: Our Environment",
        "Class 8: Resource and Development",
        "Class 9: Contemporary India I",
        "Class 10: Contemporary India II",
        "Class 11: Fundamentals of Physical Geography, India: Physical Environment",
        "Class 12: Fundamentals of Human Geography, India: People and Economy"
      ]
    },
    {
      title: "ECONOMICS",
      books: [
        "Class 9: Economics (Basic concepts)",
        "Class 10: Understanding Economic Development",
        "Class 11: Indian Economic Development",
        "Class 12: Introductory Macroeconomics"
      ]
    },
    {
      title: "ART & CULTURE",
      books: [
        "Class 11: An Introduction to Indian Art",
        "Class 12: Themes in Indian History (Culture portions)",
        "NCERT Crafts Tradition of India (Supplementary)"
      ]
    }
  ];

  // Placeholder for other sections (to be filled later)
  const otherSections = [
    {
      title: "Standard Reference Books",
      description: "Advanced study material for each subject"
    },
    {
      title: "Current Affairs Resources",
      description: "Daily news analysis and monthly magazines"
    },
    {
      title: "Optional Subject Materials",
      description: "Specialized resources for chosen optional subjects"
    }
  ];

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
              key={index}
              className="subject-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="subject-title">{subject.title}</h4>
              <ul className="book-list">
                {subject.books.map((book, i) => (
                  <li key={i}>{book}</li>
                ))}
              </ul>
              <motion.button
                className="download-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download PDFs
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Placeholder for other sections */}
      {otherSections.map((section, index) => (
        <motion.section
          key={index}
          className="coming-soon-section"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 + (index * 0.2) }}
        >
          <h3 className="section-title">{section.title}</h3>
          <p className="section-description">{section.description}</p>
          <div className="coming-soon">Section Coming Soon</div>
        </motion.section>
      ))}
    </div>
  );
};

export default StudyMaterial;