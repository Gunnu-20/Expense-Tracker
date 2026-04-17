import mongoose from 'mongoose';

export const CATEGORIES = [
  'Food', 'Travel', 'Bills', 'Shopping',
  'Health', 'Entertainment', 'Education', 'Other'
];

export const TYPES = ['expense', 'income'];

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be positive'],
  },
  type: {
    type: String,
    enum: TYPES,
    required: true,
    default: 'expense',
  },
  category: {
    type: String,
    enum: CATEGORIES,
    required: [true, 'Category is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now,
  },
  note: {
    type: String,
    trim: true,
    maxlength: [300, 'Note cannot exceed 300 characters'],
  },
}, { timestamps: true });

// ─── Compound index for fast user+date queries ────────────────
expenseSchema.index({ user: 1, date: -1 });
expenseSchema.index({ user: 1, category: 1 });

export default mongoose.model('Expense', expenseSchema);