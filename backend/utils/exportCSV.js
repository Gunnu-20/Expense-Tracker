/**
 * Convert an array of expense objects to CSV string
 */
export const toCSV = (expenses) => {
  const headers = ['Title', 'Amount', 'Type', 'Category', 'Date', 'Note'];
  
  const rows = expenses.map(e => [
    `"${e.title}"`,
    e.amount,
    e.type,
    e.category,
    new Date(e.date).toLocaleDateString(),
    `"${e.note || ''}"`,
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
};