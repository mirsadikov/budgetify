import express from 'express';
import {
  createAccount,
  deleteAccount,
  getAccount,
  getAllAccounts,
  updateAccount,
} from '../controller/accountController.js';
import { auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', auth, createAccount);
router.get('/', auth, getAllAccounts);
router
  .route('/:id')
  .put(auth, updateAccount)
  .get(auth, getAccount)
  .delete(auth, deleteAccount);

export default router;
