import Expense from '../models/Expense.js';

export const getDashboardData = async (req, res) => {
  const { month = new Date().getMonth(), year = new Date().getFullYear() } = req.query;
  const userId = req.user._id;

  const startDate = new Date(year, month, 1);
  const endDate   = new Date(year, Number(month) + 1, 0);

  const [summary, categoryBreakdown, monthlyTrend, recent] = await Promise.all([
    // Total income & expense this month
    Expense.aggregate([
      { $match: { user: userId, date: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: '$type', total: { $sum: '$amount' } } },
    ]),

    // Expenses by category this month
    Expense.aggregate([
      { $match: { user: userId, type: 'expense', date: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } },
    ]),

    // Last 6 months trend
    Expense.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: new Date(year, Number(month) - 5, 1) },
        },
      },
      {
        $group: {
          _id: { month: { $month: '$date' }, year: { $year: '$date' }, type: '$type' },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]),

    // 5 recent transactions
    Expense.find({ user: userId }).sort({ date: -1 }).limit(5),
  ]);

  const totalIncome  = summary.find(s => s._id === 'income')?.total  || 0;
  const totalExpense = summary.find(s => s._id === 'expense')?.total || 0;

  res.json({
    summary: {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      savingsRate: totalIncome > 0
        ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
        : 0,
    },
    categoryBreakdown,
    monthlyTrend,
    recent,
  });
};