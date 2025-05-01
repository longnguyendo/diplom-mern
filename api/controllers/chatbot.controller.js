import Chat from '../models/chatbot.model.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getHistoryChat = async (req, res, next) => {
    try {
        // Implement your MongoDB logic here to fetch chat history
        // Example:
        const chats = await Chat.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(chats);
        
        res.json([]); // placeholder
      } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ error: 'Failed to fetch chat history' });
      }
}

export const postReplyChat = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'Not allowed to chat gpt'));
  }
  const { message } = req.body;
  const userId = req.user.id;
  console.log(message, userId);

  try {

    const { message } = req.body;
    
    // Call DeepSeek API
    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: "deepseek-chat", // or the specific model you're using
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const chat = await Chat.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          messages: {
            $each: [
              { content: message, role: 'user' },
              { content: response.data.choices[0].message.content, role: 'assistant' }
            ]
          }
        }
      },
      { new: true, upsert: true }
    );

    await chat.save();
    console.log(chat)

    res.json({
      reply: response.data.choices[0].message.content
    });


  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    res.status(500).json({ error: 'Failed to get response from chatbot' });
    next(error);
  }
}