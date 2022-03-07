import express from 'express';
import { authUser, logOutUser } from '../controller/userController.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/logout', logOutUser);

export default router;
