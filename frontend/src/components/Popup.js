import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BookViewer from './BookViewer';
import './Popup.css';

const Popup = ({ subject, onClose }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookViewer, setShowBookViewer] = useState(false);

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleViewBook = () => {
    if (selectedBook) {
      setShowBookViewer(true);
    }
  };

  const handleCloseBookViewer = () => {
    setShowBookViewer(false);
    setSelectedBook(null);
  };

  return (
    <>
      <div className="popup-overlay" onClick={onClose}>
        <motion.div
          className="popup-content"
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="popup-title">{subject.title} Books</h3>
          <div className="book-grid">
            {subject.books.map((book) => (
              <motion.div
                key={book}
                className={`book-item ${selectedBook === book ? 'selected' : ''}`}
                onClick={() => handleBookSelect(book)}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {book}
              </motion.div>
            ))}
          </div>
          <div className="popup-actions">
            <motion.button
              className="view-btn"
              onClick={handleViewBook}
              disabled={!selectedBook}
              whileHover={{ scale: selectedBook ? 1.03 : 1, boxShadow: selectedBook ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none' }}
              whileTap={{ scale: selectedBook ? 0.97 : 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              View Book
            </motion.button>
            <motion.button
              className="dismiss-btn"
              onClick={onClose}
              whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              Dismiss
            </motion.button>
          </div>
        </motion.div>
      </div>

      {showBookViewer && (
        <BookViewer book={`${subject.title} ${selectedBook}`} onClose={handleCloseBookViewer} />
      )}
    </>
  );
};

export default Popup;