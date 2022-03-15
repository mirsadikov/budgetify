import express from 'express';
import {
  createIncome,
  deleteIncome,
  getAllIncomes,
  getIncome,
  updateIncome,
} from '../controller/incomeController.js';
import { auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', auth, createIncome);
router.get('/', auth, getAllIncomes);
router
  .route('/:id')
  .post(auth, updateIncome)
  .get(auth, getIncome)
  .delete(auth, deleteIncome);

export default router;
