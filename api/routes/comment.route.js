import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, getPostComments } from '../controllers/comment.controller.js';

const router = express.Router();

router.get('/create', (req, res) => {
  res.json({ message: "API is working" });
});

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);

export default router;