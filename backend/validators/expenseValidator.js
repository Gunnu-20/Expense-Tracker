import { body, validationResult } from 'express-validator';

const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Education', 'Other'];
const TYPES = ['expense', 'income'];

// ─── Reusable error handler ───────────────────────────────────
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ─── Expense validation ───────────────────────────────────────
export const validateExpense = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title max 100 chars'),
  body('amount')
    .isFloat({ min: 0.01 }).withMessage('Amount must be positive'),
  body('type')
    .isIn(TYPES).withMessage('Type must be income or expense'),
  body('category')
    .isIn(CATEGORIES).withMessage('Invalid category'),
  body('date')
    .isISO8601().withMessage('Valid date required'),
  handleValidationErrors,
];