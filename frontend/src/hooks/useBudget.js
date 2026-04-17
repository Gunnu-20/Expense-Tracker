import { useState, useCallback } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useBudget = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBudgets = useCallback(async (month, year) => {
    setLoading(true);
    try {
      const { data } = await api.get('/budgets', { params: { month, year } });
      setBudgets(data);
    } catch {
      toast.error('Failed to load budgets');
    } finally {
      setLoading(false);
    }
  }, []);

  const setBudget = useCallback(async (payload) => {
    const { data } = await api.post('/budgets', payload);
    toast.success('Budget saved!');
    return data;
  }, []);

  const deleteBudget = useCallback(async (id) => {
    await api.delete(`/budgets/${id}`);
    setBudgets(prev => prev.filter(b => b._id !== id));
    toast.success('Budget removed');
  }, []);

  return { budgets, loading, fetchBudgets, setBudget, deleteBudget };
};