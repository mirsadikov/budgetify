import express from 'express';
import {
  createFaq,
  deleteFaq,
  getAllFaqs,
  getFaq,
  updateFaq,
} from '../controller/faqController.js';
import { admin, auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', auth, admin, createFaq);
router.get('/', auth, getAllFaqs);
router
  .route('/:id')
  .post(auth, admin, updateFaq)
  .get(auth, getFaq)
  .delete(auth, admin, deleteFaq);

export default router;
