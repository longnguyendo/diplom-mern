import express from 'express';

import { verifyToken } from '../utils/verifyUser.js'; // if you have auth
import { getHistoryChat, postReplyChat } from '../controllers/chatbot.controller.js';

const router = express.Router();

// POST endpoint to send message to DeepSeek API
router.post('/reply/:userId', verifyToken, postReplyChat);
router.get('/reply', (req, res) => {
    res.json({ message: "API is working" });
  });

// GET endpoint to fetch chat history (if you want to persist chats)
router.get('/history/:userId', verifyToken, getHistoryChat);

export default router;