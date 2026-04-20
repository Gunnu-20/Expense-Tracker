import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import SummaryCards from '../components/dashboard/SummaryCards';
import MonthlyChart from '../components/dashboard/MonthlyChart';
import CategoryChart from '../components/dashboard/CategoryChart';
import { formatCurrency, formatDate, CATEGORY_ICONS } from '../utils/helpers';

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [month] = useState(new Date().getMonth());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    api.get('/dashboard', { params: { month, year } })
      .then(r => setData(r.data))
      .finally(() => setLoading(false));
  }, [month, year]);

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
          Good {new Date().getHours() < 12 ? 'morning' : 'evening'}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards
        summary={data?.summary || {}}
        loading={loading}
        currency={user?.currency}
      />

      {/* Charts — stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          <MonthlyChart trend={data?.monthlyTrend} />
        </div>
        <CategoryChart data={data?.categoryBreakdown} />
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl p-5 border border-gray-100 dark:border-dark-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h3>
        <div className="divide-y divide-gray-100 dark:divide-dark-700">
          {(data?.recent || []).map(tx => (
            <div key={tx._id} className="flex items-center gap-3 py-3">
              <span className="text-xl">{CATEGORY_ICONS[tx.category]}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{tx.title}</p>
                <p className="text-xs text-gray-400">{formatDate(tx.date)}</p>
              </div>
              <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount, user?.currency)}
              </span>
            </div>
          ))}
          {!loading && !data?.recent?.length && (
            <p className="text-center text-gray-400 text-sm py-8">No transactions yet</p>
          )}
        </div>
      </div>
    </div>
  );
}