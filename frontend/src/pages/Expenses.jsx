import { useEffect, useState, useCallback } from 'react';
import { Plus, Download } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';
import { useAuth } from '../context/AuthContext';
import ExpenseList from '../components/expenses/ExpenseList';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseFilters from '../components/expenses/ExpenseFilters';
import Modal from '../components/common/Modal';

const DEFAULT_FILTERS = {
  search: '', category: '', type: '', startDate: '', endDate: '',
};

export default function Expenses() {
  const { user } = useAuth();
  const { expenses, pagination, loading, fetchExpenses, createExpense, updateExpense, deleteExpense, exportCSV } = useExpenses();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    fetchExpenses({ ...filters, page, limit: 10 });
  }, [filters, page, fetchExpenses]);

  useEffect(() => { load(); }, [load]);

  const onFilter = (key, val) => {
    setFilters(f => ({ ...f, [key]: val }));
    setPage(1);
  };

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      if (editing) {
        await updateExpense(editing._id, data);
      } else {
        await createExpense(data);
      }
      setModalOpen(false);
      setEditing(null);
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (exp) => {
    setEditing({ ...exp, date: exp.date?.split('T')[0] });
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
          <p className="text-sm text-gray-500">{pagination.total || 0} total records</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Download size={16} /> <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            onClick={() => { setEditing(null); setModalOpen(true); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-colors"
          >
            <Plus size={16} /> <span className="hidden sm:inline">Add New</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl p-4 border border-gray-100 dark:border-dark-700">
        <ExpenseFilters
          filters={filters}
          onChange={onFilter}
          onReset={() => { setFilters(DEFAULT_FILTERS); setPage(1); }}
        />
      </div>

      {/* List */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl p-5 border border-gray-100 dark:border-dark-700">
        <ExpenseList
          expenses={expenses}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteExpense}
          currency={user?.currency}
        />

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {[...Array(pagination.pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors
                  ${page === i + 1
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-700'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        title={editing ? 'Edit Transaction' : 'New Transaction'}
      >
        <ExpenseForm
          initial={editing}
          onSubmit={handleSubmit}
          loading={saving}
        />
      </Modal>
    </div>
  );
}