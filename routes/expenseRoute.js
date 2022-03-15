import express from 'express';
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
} from '../controller/expenseController.js';
import { auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', auth, createExpense);
router.get('/', auth, getAllExpenses);
router
  .route('/:id')
  .post(auth, updateExpense)
  .get(auth, getExpense)
  .delete(auth, deleteExpense);

export default router;
