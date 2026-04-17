import { TrendingUp, TrendingDown, Wallet, Percent } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { SkeletonCard } from '../common/Skeleton';

const cards = (s, currency) => [
  {
    label: 'Total Income',
    value: formatCurrency(s.totalIncome, currency),
    icon: TrendingUp,
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-950/20',
    change: '+12.5%',
  },
  {
    label: 'Total Expenses',
    value: formatCurrency(s.totalExpense, currency),
    icon: TrendingDown,
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-950/20',
    change: '-3.2%',
  },
  {
    label: 'Net Balance',
    value: formatCurrency(s.balance, currency),
    icon: Wallet,
    color: s.balance >= 0 ? 'text-blue-500' : 'text-red-500',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    change: s.balance >= 0 ? 'Surplus' : 'Deficit',
  },
  {
    label: 'Savings Rate',
    value: `${s.savingsRate}%`,
    icon: Percent,
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    change: 'This month',
  },
];

export default function SummaryCards({ summary, loading, currency }) {
  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards(summary, currency).map(({ label, value, icon: Icon, color, bg, change }) => (
        <div key={label} className="bg-white dark:bg-dark-800 rounded-2xl p-5 border border-gray-100 dark:border-dark-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</span>
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon size={18} className={color} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
          <p className="text-xs text-gray-400">{change}</p>
        </div>
      ))}
    </div>
  );
}