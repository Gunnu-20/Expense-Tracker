import { body, validationResult } from 'express-validator';

// ─── Reusable error handler ───────────────────────────────────
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ─── Signup validation ────────────────────────────────────────
export const validateSignup = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 50 }).withMessage('Name max 50 chars'),
  body('email')
    .isEmail().withMessage('Enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password min 6 characters'),
  handleValidationErrors,
];

// ─── Login validation ─────────────────────────────────────────
export const validateLogin = [
  body('email')
    .isEmail().withMessage('Enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];