import { format } from 'date-fns';

export const CATEGORIES = [
  'Food', 'Travel', 'Bills', 'Shopping',
  'Health', 'Entertainment', 'Education', 'Other'
];

export const CATEGORY_COLORS = {
  Food:          '#f97316',
  Travel:        '#3b82f6',
  Bills:         '#ef4444',
  Shopping:      '#a855f7',
  Health:        '#22c55e',
  Entertainment: '#f59e0b',
  Education:     '#06b6d4',
  Other:         '#6b7280',
};

export const CATEGORY_ICONS = {
  Food:          '🍔',
  Travel:        '✈️',
  Bills:         '💡',
  Shopping:      '🛍️',
  Health:        '💊',
  Entertainment: '🎬',
  Education:     '📚',
  Other:         '📦',
};

export const formatCurrency = (amount, currency = 'INR') =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);

export const formatDate = (date) => format(new Date(date), 'dd MMM yyyy');

export const getMonthName = (month) =>
  new Date(2000, month).toLocaleString('default', { month: 'short' });