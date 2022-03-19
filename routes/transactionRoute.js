import express from 'express';
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  getTransactionsByAccount,
  updateTransaction,
} from '../controller/transactionController.js';
import { auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', auth, createTransaction);
router.get('/', auth, getAllTransactions);
router
  .route('/:id')
  .put(auth, updateTransaction)
  .get(auth, getTransaction)
  .delete(auth, deleteTransaction);
router.get('/byaccount/:accountId', auth, getTransactionsByAccount);

export default router;
