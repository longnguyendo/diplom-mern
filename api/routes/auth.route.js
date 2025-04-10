import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

// router.get(_path, fn of that path);
router.get('/test', (req, res) => {
  res.json({ message: "API is working" });
});

router.post('/signup', signup);

export default router;