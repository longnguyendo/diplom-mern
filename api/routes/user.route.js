import express from 'express';
import { test, updateUser, deleteUser, signoutUser, getUsers, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// router.get(_path, fn of that path);
router.get('/update', (req, res) => {
  res.json({ message: "API is working" });
});

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signoutUser);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);

export default router;