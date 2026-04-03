import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getSpendingByCategory } from '../../utils/calculations';
import { useAppContext } from '../../context/AppContext';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

export const SpendingBreakdown = () => {
  const { transactions, darkMode } = useAppContext();
  const data = getSpendingByCategory(transactions);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-[400px] flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold dark:text-white">Spending Breakdown</h3>
        <p className="text-xs text-gray-500">Expenses by category</p>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#111827' : '#fff', 
                borderColor: darkMode ? '#374151' : '#e5e7eb',
                borderRadius: '12px',
                color: darkMode ? '#fff' : '#000'
              }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
