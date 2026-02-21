const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client } = require('@gradio/client');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gradio Client for your specific Space
let client;
async function initClient() {
  try {
    client = await Client.connect("ergtygfh/gpt-kimi", {
      hf_token: process.env.HF_ACCESS_TOKEN
    });
    console.log("Connected to Kimi Space successfully!");
  } catch (error) {
    console.error("Failed to connect to Kimi Space:", error);
  }
}
initClient();

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  const lastUserMessage = messages[messages.length - 1].content;

  if (!client) {
    return res.status(503).json({ error: 'Gradio client not initialized.' });
  }

  try {
    // Calling the '/chat' endpoint as shown in your documentation
    const result = await client.predict("/chat", {
      user_input: lastUserMessage,
    });

    // The documentation shows it returns a string (result.data[0])
    const botResponse = result.data[0];

    res.json({ message: { role: 'assistant', content: botResponse } });
  } catch (error) {
    console.error('Error from Kimi Space:', error);
    res.status(500).json({ error: 'Failed to fetch response from your Kimi Space. Check if the Space is running.' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', space: 'ergtygfh/gpt-kimi' });
});

app.listen(port, () => {
  console.log(`Server is running and linked to your Space on port ${port}`);
});
