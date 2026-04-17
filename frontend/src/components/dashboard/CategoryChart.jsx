import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CATEGORY_COLORS } from '../../utils/helpers';

export default function CategoryChart({ data }) {
  const chartData = (data || []).map(d => ({
    name: d._id,
    value: d.total,
  }));

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-5 border border-gray-100 dark:border-dark-700">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-5">By Category</h3>
      {chartData.length === 0 ? (
        <div className="h-[260px] flex items-center justify-center text-gray-400 text-sm">
          No expense data
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map(entry => (
                <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#6b7280'} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v) => [`₹${v.toLocaleString()}`, '']}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}