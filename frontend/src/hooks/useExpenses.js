import { useState, useCallback } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useExpenses = () => {
  const [expenses, setExpenses]     = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading]       = useState(false);

  const fetchExpenses = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await api.get('/expenses', { params });
      setExpenses(data.expenses);
      setPagination(data.pagination);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }, []);

  const createExpense = useCallback(async (payload) => {
    const { data } = await api.post('/expenses', payload);
    toast.success('Expense added!');
    return data;
  }, []);

  const updateExpense = useCallback(async (id, payload) => {
    const { data } = await api.put(`/expenses/${id}`, payload);
    toast.success('Expense updated!');
    return data;
  }, []);

  const deleteExpense = useCallback(async (id) => {
    await api.delete(`/expenses/${id}`);
    toast.success('Expense deleted');
    setExpenses(prev => prev.filter(e => e._id !== id));
  }, []);

  const exportCSV = useCallback(async () => {
    const response = await api.get('/expenses/export/csv', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast.success('CSV downloaded!');
  }, []);

  return { expenses, pagination, loading, fetchExpenses, createExpense, updateExpense, deleteExpense, exportCSV };
};