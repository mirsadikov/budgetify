import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../controller/categoryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createCategory);
router.get('/', protect, getAllCategories);
router
  .route('/:id')
  .post(protect, updateCategory)
  .get(protect, getCategory)
  .delete(protect, deleteCategory);

export default router;
