import express from 'express';
import {
  createAccount,
  deleteAccount,
  getAccount,
  getAllAccounts,
  updateAccount,
} from '../controller/accountController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createAccount);
router.get('/', protect, getAllAccounts);
router
  .route('/:id')
  .post(protect, updateAccount)
  .get(protect, getAccount)
  .delete(protect, deleteAccount);

export default router;
