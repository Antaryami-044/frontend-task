import React from 'react';
import { motion } from 'motion/react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { calculateSummary } from '../../utils/calculations';
import { useAppContext } from '../../context/AppContext';

export const SummaryCards = () => {
  const { transactions } = useAppContext();
  const summary = calculateSummary(transactions);

  const cards = [
    {
      label: 'Total Balance',
      value: summary.totalBalance,
      icon: Wallet,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      label: 'Total Income',
      value: summary.totalIncome,
      icon: TrendingUp,
      color: 'green',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Total Expenses',
      value: summary.totalExpenses,
      icon: TrendingDown,
      color: 'red',
      gradient: 'from-rose-500 to-pink-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative overflow-hidden group"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
          <div className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${card.color}-50 dark:bg-${card.color}-900/20 text-${card.color}-600 dark:text-${card.color}-400`}>
                <card.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{card.label}</span>
            </div>
            <h3 className="text-2xl font-bold dark:text-white">
              ${card.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <div className="mt-2 flex items-center gap-1">
              <span className="text-[10px] text-gray-500 dark:text-gray-400">Updated just now</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
