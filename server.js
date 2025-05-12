const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const OPENAI_API_KEY = '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';

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'أجب باللغة العربية فقط، كأنك روبوت محادثة مساعد.' },
          { role: 'user', content: userMessage }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const botReply = response.data.choices[0].message.content;
    res.json({ reply: botReply });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('حدث خطأ أثناء الاتصال بـ OpenAI');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});