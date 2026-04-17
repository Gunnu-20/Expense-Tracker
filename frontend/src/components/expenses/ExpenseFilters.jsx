import { Search, X } from 'lucide-react';
import { CATEGORIES } from '../../utils/helpers';

const cls = "px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500";

export default function ExpenseFilters({ filters, onChange, onReset }) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search..."
          value={filters.search}
          onChange={e => onChange('search', e.target.value)}
          className={`${cls} pl-9 w-48`}
        />
      </div>

      <select value={filters.category} onChange={e => onChange('category', e.target.value)} className={cls}>
        <option value="">All Categories</option>
        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
      </select>

      <select value={filters.type} onChange={e => onChange('type', e.target.value)} className={cls}>
        <option value="">All Types</option>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input type="date" value={filters.startDate} onChange={e => onChange('startDate', e.target.value)} className={cls} />
      <span className="text-gray-400 text-sm">to</span>
      <input type="date" value={filters.endDate} onChange={e => onChange('endDate', e.target.value)} className={cls} />

      {/* Reset */}
      <button onClick={onReset} className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
        <X size={16} />
      </button>
    </div>
  );
}