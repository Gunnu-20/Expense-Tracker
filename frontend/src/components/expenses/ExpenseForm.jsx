import { useState, useEffect } from 'react';
import { CATEGORIES } from '../../utils/helpers';

const DEFAULT = {
  title: '', amount: '', type: 'expense',
  category: 'Food', date: new Date().toISOString().split('T')[0], note: '',
};

export default function ExpenseForm({ initial, onSubmit, loading }) {
  const [form, setForm] = useState(initial || DEFAULT);

  useEffect(() => { if (initial) setForm(initial); }, [initial]);

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, amount: parseFloat(form.amount) });
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type toggle */}
      <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-dark-700">
        {['expense', 'income'].map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setForm(f => ({ ...f, type: t }))}
            className={`flex-1 py-2.5 text-sm font-semibold capitalize transition-colors
              ${form.type === t
                ? t === 'expense'
                  ? 'bg-red-500 text-white'
                  : 'bg-green-500 text-white'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-900'
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      <input name="title"    value={form.title}    onChange={onChange} placeholder="Title"  required className={inputCls} />
      <input name="amount"   value={form.amount}   onChange={onChange} placeholder="Amount" required type="number" min="0.01" step="0.01" className={inputCls} />

      <div className="grid grid-cols-2 gap-3">
        <select name="category" value={form.category} onChange={onChange} className={inputCls}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <input name="date" value={form.date} onChange={onChange} type="date" required className={inputCls} />
      </div>

      <textarea name="note" value={form.note} onChange={onChange} placeholder="Note (optional)" rows={2} className={inputCls} />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm transition-colors disabled:opacity-60"
      >
        {loading ? 'Saving...' : 'Save Expense'}
      </button>
    </form>
  );
}