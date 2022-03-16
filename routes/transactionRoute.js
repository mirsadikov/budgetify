import express from 'express';
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  updateTransaction,
} from '../controller/transactionController.js';
import { auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', auth, createTransaction);
router.get('/', auth, getAllTransactions);
router
  .route('/:id')
  .post(auth, updateTransaction)
  .get(auth, getTransaction)
  .delete(auth, deleteTransaction);

export default router;
