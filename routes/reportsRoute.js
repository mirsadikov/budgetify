import express from 'express';
import {
  expensesByCategories,
  generalTotalExpense,
  generalTotalIncome,
  personalTotalExpense,
  personalTotalIncome,
  totalUsers,
} from '../controller/reportsController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/totalusers', protect, admin, totalUsers);
router.get('/userincomes', protect, personalTotalIncome);
router.get('/generalincomes', protect, admin, generalTotalIncome);

router.get('/categoryexpenses', protect, expensesByCategories);
router.get('/userexpenses', protect, personalTotalExpense);
router.get('/generalexpenses', protect, admin, generalTotalExpense);

export default router;
