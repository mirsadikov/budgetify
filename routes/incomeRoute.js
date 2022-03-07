import express from 'express';
import {
  createIncome,
  deleteIncome,
  getAllIncomes,
  getIncome,
  updateIncome,
} from '../controller/incomeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createIncome);
router.get('/', protect, getAllIncomes);
router
  .route('/:id')
  .post(protect, updateIncome)
  .get(protect, getIncome)
  .delete(protect, deleteIncome);

export default router;
