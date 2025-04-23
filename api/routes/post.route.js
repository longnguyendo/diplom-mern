import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getposts } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/create', (req, res) => {
  res.json({ message: "API is working" });
});

router.post('/create', verifyToken, create);
router.get('/getposts', getposts);

export default router;