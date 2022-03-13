import express from 'express';
import {
  loginUser,
  logOutUser,
  registerUser,
} from '../controller/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logOutUser);

export default router;
