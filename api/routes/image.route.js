import express from 'express';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';
import { verifyToken } from '../utils/verifyUser.js';

const upload = multer({ storage });

const router = express.Router();

// Single image upload
router.post('/single', verifyToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    res.json({
      imageUrl: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Multiple images upload
router.post('/multiple', verifyToken, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }

    const uploadResults = req.files.map(file => ({
      imageUrl: file.path,
      publicId: file.filename
    }));

    res.json(uploadResults);
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Images upload failed' });
  }
});

export default router;