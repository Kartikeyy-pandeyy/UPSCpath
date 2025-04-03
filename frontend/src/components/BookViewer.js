import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaSpinner, FaStickyNote } from 'react-icons/fa';
import './BookViewer.css';

const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const BookViewer = ({ book, onClose }) => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [showNotesPopup, setShowNotesPopup] = useState(false);
  const iframeRef = useRef(null);

  // Fetch PDF URL from backend
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(`${backendURL}/book-url?book=${encodeURIComponent(book)}`, {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch PDF URL');
        const { url } = await response.json();
        setPdfUrl(url);
      } catch (error) {
        console.error('Error fetching PDF URL:', error);
        setPdfUrl('');
      } finally {
        setLoading(false);
      }
    };
    fetchPdf();
  }, [book]);

  // Download notes locally
  const downloadNotes = () => {
    if (!notes) return;
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book}-notes.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Toggle notes popup
  const toggleNotesPopup = () => {
    setShowNotesPopup(!showNotesPopup);
  };

  const viewerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <div className="book-viewer-overlay">
      <motion.div
        className="book-viewer-container"
        variants={viewerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="book-viewer-header">
          <h3 className="book-viewer-title">{book}</h3>
          <div className="book-viewer-actions">
            <motion.button
              className="action-btn download-btn"
              onClick={() => window.open(pdfUrl, '_blank')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Download PDF"
              disabled={!pdfUrl || loading}
            >
              <FaDownload />
            </motion.button>
            <motion.button
              className="action-btn notes-btn"
              onClick={toggleNotesPopup}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Take Notes"
            >
              <FaStickyNote />
            </motion.button>
            <motion.button
              className="action-btn close-btn"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Close Viewer"
            >
              <FaTimes />
            </motion.button>
          </div>
        </div>

        <div className="book-viewer-body">
          {loading && (
            <div className="loading-overlay">
              <FaSpinner className="spinner" />
              <span>Loading PDF...</span>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={pdfUrl || '#'}
            title={book}
            className="book-iframe"
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* Notes Popup */}
        <AnimatePresence>
          {showNotesPopup && (
            <motion.div
              className="notes-popup"
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <textarea
                className="notes-input"
                placeholder="Take notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <div className="notes-actions">
                <motion.button
                  className="download-notes-btn"
                  onClick={downloadNotes}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!notes}
                >
                  <FaDownload /> Download Notes
                </motion.button>
              </div>
              <p className="notes-session-notice">
                Notes are only stored in this session. Download them for further use.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BookViewer;