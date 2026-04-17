import express from 'express';
import {
  getExpenses, createExpense, updateExpense, deleteExpense, exportCSV
} from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateExpense } from '../validators/expenseValidator.js';

const router = express.Router();

router.use(protect); // All expense routes are protected

router.route('/')
  .get(getExpenses)
  .post(validateExpense, createExpense);

router.route('/:id')
  .put(validateExpense, updateExpense)
  .delete(deleteExpense);

router.get('/export/csv', exportCSV);

export default router;