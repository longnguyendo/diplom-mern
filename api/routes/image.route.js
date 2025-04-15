import { imageUpload } from '../controllers/image.controller.js';
import express from 'express';
import { storage } from '../config/cloudinary.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }
 });


router.get('/upload', (req, res) => {
    res.json({ message: "API is working" });
  });  

router.post('/upload', upload.single('image'), imageUpload);

export default router;