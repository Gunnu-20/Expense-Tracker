import mongoose from 'mongoose';
import { CATEGORIES } from './Expense.js';

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: CATEGORIES,
    required: true,
  },
  limit: {
    type: Number,
    required: [true, 'Budget limit is required'],
    min: [1, 'Budget must be at least 1'],
  },
  month: {
    type: Number, // 0-11
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

// ─── One budget per category per month per user ───────────────
budgetSchema.index({ user: 1, category: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model('Budget', budgetSchema);