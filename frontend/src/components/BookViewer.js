import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AWS from 'aws-sdk';
import { FaPlay, FaPause } from 'react-icons/fa';
import './BookViewer.css';

// Configure AWS SDK (replace with your credentials or use IAM roles)
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: 'us-east-1', // Replace with your S3 region
});

const polly = new AWS.Polly();
const s3 = new AWS.S3();

const BookViewer = ({ book, onClose }) => {
  const [content, setContent] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const fetchBookContent = async () => {
      const params = {
        Bucket: 'upscpath-study-materials', // Replace with your S3 bucket name
        Key: `${book.replace(/\s+/g, '-').toLowerCase()}.txt`, // e.g., science-class-6.txt
      };
      try {
        const data = await s3.getObject(params).promise();
        setContent(data.Body.toString('utf-8'));
      } catch (error) {
        console.error('Error fetching book:', error);
        setContent(`Sample content for ${book}`); // Fallback content
      }
    };
    fetchBookContent();
  }, [book]);

  const handleTextSelection = () => {
    const selection = window.getSelection().toString();
    if (selection) setSelectedText(selection);
  };

  const synthesizeSpeech = async () => {
    if (!selectedText) return;

    const params = {
      Text: selectedText,
      OutputFormat: 'mp3',
      VoiceId: 'Joanna', // Change voice as needed
    };

    try {
      const data = await polly.synthesizeSpeech(params).promise();
      const audioBlob = new Blob([data.AudioStream], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const newAudio = new Audio(audioUrl);

      if (audio) audio.pause();
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);

      newAudio.onended = () => setIsPlaying(false);
    } catch (error) {
      console.error('Error with Polly:', error);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div className="book-viewer-overlay" onClick={onClose}>
      <motion.div
        className="book-viewer-content"
        Variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="book-viewer-title">{book}</h3>
        <div className="book-content" onMouseUp={handleTextSelection}>
          {content}
        </div>

        {selectedText && (
          <div className="polly-controls">
            <motion.button
              className="play-btn"
              onClick={synthesizeSpeech}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlay /> Read Selected Text
            </motion.button>
            {audio && (
              <motion.button
                className="toggle-btn"
                onClick={toggleAudio}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <FaPause /> : <FaPlay />} {isPlaying ? 'Pause' : 'Resume'}
              </motion.button>
            )}
          </div>
        )}

        <motion.button
          className="close-btn"
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Close
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BookViewer;