const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/summarize', async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1',
      {
        inputs: `Summarize the following topic in bullet points:\n\n${text}`,
        parameters: { max_length: 10, min_length: 1 },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const summary = response.data[0]?.generated_text || 'No summary generated';
    res.json({ summary });
  } catch (error) {
    console.error('Summarization error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

module.exports = router;