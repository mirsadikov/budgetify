import express from 'express';
import {
  createFaq,
  deleteFaq,
  getAllFaqs,
  getFaq,
  updateFaq,
} from '../controller/faqController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, admin, createFaq);
router.get('/', protect, getAllFaqs);
router
  .route('/:id')
  .post(protect, admin, updateFaq)
  .get(protect, getFaq)
  .delete(protect, admin, deleteFaq);

export default router;
