import express from 'express';
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
} from '../controller/expenseController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createExpense);
router.get('/', protect, getAllExpenses);
router
  .route('/:id')
  .post(protect, updateExpense)
  .get(protect, getExpense)
  .delete(protect, deleteExpense);

export default router;
