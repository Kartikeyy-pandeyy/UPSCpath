const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/summarize', async (req, res) => {
  try {
    console.log("Received request body:", req.body); // ✅ DEBUGGING LOG

    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Topic text is required for summarization.' });
    }

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3',
      {
        inputs: `Summarize the following in bullet points and keep it under 150 tokens:\n\n"${text}"`,
        parameters: {
          max_length: 70,
          temperature: 0.3,
          top_p: 0.9,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    console.log("Hugging Face API Response:", response.data); // ✅ DEBUGGING LOG

    if (!response.data || !response.data[0]?.generated_text) {
      return res.status(500).json({ error: 'Failed to generate summary from the model.' });
    }

    const summary = response.data[0].generated_text;

    res.json({ summary });
  } catch (error) {
    console.error('Error summarizing:', error.response?.data || error.message);
    res.status(500).json({ error: 'Summarization failed. Please try again later.' });
  }
});

module.exports = router;
