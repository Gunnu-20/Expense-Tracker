import Budget from '../models/Budget.js';
import Expense from '../models/Expense.js';

// ─── GET budgets for a month ──────────────────────────────────
export const getBudgets = async (req, res) => {
  const { month = new Date().getMonth(), year = new Date().getFullYear() } = req.query;

  const budgets = await Budget.find({
    user: req.user._id,
    month: Number(month),
    year: Number(year),
  });

  // Attach actual spending per category
  const startDate = new Date(year, month, 1);
  const endDate   = new Date(year, Number(month) + 1, 0);

  const spending = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
        type: 'expense',
        date: { $gte: startDate, $lte: endDate },
      },
    },
    { $group: { _id: '$category', total: { $sum: '$amount' } } },
  ]);

  const spendMap = Object.fromEntries(spending.map(s => [s._id, s.total]));

  const result = budgets.map(b => ({
    ...b.toObject(),
    spent: spendMap[b.category] || 0,
    exceeded: (spendMap[b.category] || 0) > b.limit,
  }));

  res.json(result);
};

// ─── UPSERT budget ───────────────────────────────────────────
export const setBudget = async (req, res) => {
  const { category, limit, month, year } = req.body;

  const budget = await Budget.findOneAndUpdate(
    { user: req.user._id, category, month, year },
    { limit },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(201).json(budget);
};

// ─── DELETE budget ───────────────────────────────────────────
export const deleteBudget = async (req, res) => {
  await Budget.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: 'Budget removed' });
};