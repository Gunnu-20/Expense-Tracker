import Expense from '../models/Expense.js';
import { toCSV } from '../utils/exportCSV.js';

// ─── GET ALL (paginated, filtered) ───────────────────────────
export const getExpenses = async (req, res) => {
  const {
    page = 1, limit = 10,
    category, type,
    startDate, endDate,
    search, sortBy = 'date', order = 'desc',
  } = req.query;

  const filter = { user: req.user._id };

  if (category) filter.category = category;
  if (type)     filter.type = type;
  if (search)   filter.title = { $regex: search, $options: 'i' };

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate)   filter.date.$lte = new Date(endDate);
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortOrder = order === 'asc' ? 1 : -1;

  const [expenses, total] = await Promise.all([
    Expense.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(limit)),
    Expense.countDocuments(filter),
  ]);

  res.json({
    expenses,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      limit: Number(limit),
    },
  });
};

// ─── CREATE ──────────────────────────────────────────────────
export const createExpense = async (req, res) => {
  const expense = await Expense.create({ ...req.body, user: req.user._id });
  res.status(201).json(expense);
};

// ─── UPDATE ──────────────────────────────────────────────────
export const updateExpense = async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
  if (!expense) return res.status(404).json({ message: 'Expense not found' });

  Object.assign(expense, req.body);
  await expense.save();
  res.json(expense);
};

// ─── DELETE ──────────────────────────────────────────────────
export const deleteExpense = async (req, res) => {
  const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!expense) return res.status(404).json({ message: 'Expense not found' });
  res.json({ message: 'Expense deleted', id: req.params.id });
};

// ─── EXPORT CSV ──────────────────────────────────────────────
export const exportCSV = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
  const csv = toCSV(expenses);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=expenses.csv');
  res.send(csv);
};