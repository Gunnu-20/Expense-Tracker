import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate, CATEGORY_ICONS, CATEGORY_COLORS } from '../../utils/helpers';
import { SkeletonRow } from '../common/Skeleton';

export default function ExpenseList({ expenses, loading, onEdit, onDelete, currency }) {
  if (loading) return <div>{[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}</div>;

  if (!expenses.length) return (
    <div className="text-center py-16 text-gray-400">
      <p className="text-4xl mb-3">💸</p>
      <p className="font-medium">No transactions found</p>
    </div>
  );

  return (
    <div className="divide-y divide-gray-100 dark:divide-dark-700">
      {expenses.map(exp => (
        <div key={exp._id} className="flex items-center gap-4 py-4 px-1 hover:bg-gray-50 dark:hover:bg-dark-900/50 rounded-xl transition-colors group">
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ backgroundColor: `${CATEGORY_COLORS[exp.category]}20` }}
          >
            {CATEGORY_ICONS[exp.category] || '📦'}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{exp.title}</p>
            <p className="text-xs text-gray-400">{exp.category} · {formatDate(exp.date)}</p>
          </div>

          {/* Amount */}
          <span className={`text-sm font-bold ${exp.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
            {exp.type === 'income' ? '+' : '-'}{formatCurrency(exp.amount, currency)}
          </span>

          {/* Actions */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(exp)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => onDelete(exp._id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}