import { useEffect, useState } from 'react';
import { useBudget } from '../hooks/useBudget';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES, CATEGORY_ICONS, CATEGORY_COLORS, formatCurrency } from '../utils/helpers';
import { Plus, Trash2, AlertTriangle } from 'lucide-react';

export default function Budget() {
  const { user } = useAuth();
  const { budgets, loading, fetchBudgets, setBudget, deleteBudget } = useBudget();
  const [month] = useState(new Date().getMonth());
  const [year]  = useState(new Date().getFullYear());
  const [form, setForm] = useState({ category: 'Food', limit: '', month, year });

  useEffect(() => { fetchBudgets(month, year); }, [month, year]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setBudget({ ...form, limit: parseFloat(form.limit) });
    fetchBudgets(month, year);
    setForm(f => ({ ...f, limit: '' }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Budget Planner</h1>
        <p className="text-sm text-gray-500">Set and track category budgets for this month</p>
      </div>

      {/* Set Budget Form */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl p-5 border border-gray-100 dark:border-dark-700">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Set Budget</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1.5 block">Category</label>
            <select
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {CATEGORIES.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1.5 block">Monthly Limit</label>
            <input
              type="number" min="1" step="1" required
              value={form.limit}
              onChange={e => setForm(f => ({ ...f, limit: e.target.value }))}
              placeholder="e.g. 5000"
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-40"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <Plus size={16} /> Save Budget
          </button>
        </form>
      </div>

      {/* Budget Cards */}
      {loading ? (
        <p className="text-center text-gray-400 py-10">Loading...</p>
      ) : budgets.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📊</p>
          <p className="font-medium">No budgets set for this month</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {budgets.map(b => {
            const pct = Math.min((b.spent / b.limit) * 100, 100);
            return (
              <div key={b._id} className="bg-white dark:bg-dark-800 rounded-2xl p-5 border border-gray-100 dark:border-dark-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{CATEGORY_ICONS[b.category]}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{b.category}</p>
                      {b.exceeded && (
                        <div className="flex items-center gap-1 text-xs text-red-500 font-medium">
                          <AlertTriangle size={11} /> Over budget!
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteBudget(b._id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 dark:bg-dark-700 rounded-full h-2 mb-3">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: b.exceeded
                        ? '#ef4444'
                        : CATEGORY_COLORS[b.category] || '#22c55e',
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>Spent: <strong className="text-gray-700 dark:text-gray-300">{formatCurrency(b.spent, user?.currency)}</strong></span>
                  <span>Limit: <strong className="text-gray-700 dark:text-gray-300">{formatCurrency(b.limit, user?.currency)}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}