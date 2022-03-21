import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../controller/categoryController.js';
import { auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', auth, createCategory);
router.get('/', auth, getAllCategories);
router
  .route('/:id')
  .put(auth, updateCategory)
  .get(auth, getCategory)
  .delete(auth, deleteCategory);

export default router;
