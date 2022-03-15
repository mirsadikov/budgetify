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
  .post(auth, updateCategory)
  .get(auth, getCategory)
  .delete(auth, deleteCategory);

export default router;
