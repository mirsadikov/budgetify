import express from 'express';
import {
  expensesByCategories,
  generalTotalExpense,
  generalTotalIncome,
  personalTotalExpense,
  personalTotalIncome,
  totalUsers,
} from '../controller/reportsController.js';
import { admin, auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/totalusers', auth, admin, totalUsers);
router.get('/userincomes', auth, personalTotalIncome);
router.get('/generalincomes', auth, admin, generalTotalIncome);

router.get('/categoryexpenses', auth, expensesByCategories);
router.get('/userexpenses', auth, personalTotalExpense);
router.get('/generalexpenses', auth, admin, generalTotalExpense);

export default router;
