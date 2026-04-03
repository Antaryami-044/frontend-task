import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { getInsights } from '../../utils/calculations';
import { motion } from 'motion/react';
import { TrendingUp, Target, Zap, BarChart3 } from 'lucide-react';

export const InsightsSection = () => {
  const { transactions } = useAppContext();
  const insights = getInsights(transactions);

  const stats = [
    {
      label: 'Highest Spending',
      value: insights.highestCategory?.name || 'N/A',
      subValue: `$${insights.highestCategory?.value.toFixed(2) || 0}`,
      icon: TrendingUp,
      color: 'rose',
    },
    {
      label: 'Saving Rate',
      value: `${insights.savingRate.toFixed(1)}%`,
      subValue: 'Income vs Expense',
      icon: Target,
      color: 'emerald',
    },
    {
      label: 'Avg Daily Spending',
      value: `$${insights.avgDailySpending.toFixed(2)}`,
      subValue: 'Last 30 days',
      icon: Zap,
      color: 'amber',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold dark:text-white">Insights</h2>
        <p className="text-sm text-gray-500">Smart analysis of your financial health</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400 mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
            <h4 className="text-2xl font-bold dark:text-white mb-1">{stat.value}</h4>
            <p className="text-xs text-gray-400">{stat.subValue}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold dark:text-white">Top Spending Categories</h3>
          </div>
          <div className="space-y-4">
            {insights.topCategories.map((cat, index) => (
              <div key={cat.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium dark:text-gray-300">{cat.name}</span>
                  <span className="font-bold dark:text-white">${cat.value.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(cat.value / insights.topCategories[0].value) * 100}%` }}
                    className={`h-full bg-gradient-to-r ${
                      index === 0 ? 'from-blue-500 to-blue-600' : 
                      index === 1 ? 'from-indigo-500 to-indigo-600' : 
                      'from-violet-500 to-violet-600'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-xl shadow-blue-600/20 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Financial Tip</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              {insights.savingRate > 20 
                ? "You're doing great! Your saving rate is above 20%. Consider investing your surplus to grow your wealth."
                : "Your saving rate is a bit low. Try to reduce your spending in the '" + insights.highestCategory?.name + "' category to reach your goals faster."}
            </p>
          </div>
          <div className="mt-8">
            <button className="px-6 py-2 bg-white text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-all">
              View Detailed Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
