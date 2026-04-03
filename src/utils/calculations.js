import { parseISO, startOfMonth, endOfMonth, isWithinInterval, subMonths, format } from 'date-fns';

export const calculateSummary = (transactions) => {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  return {
    totalBalance: totalIncome - totalExpenses,
    totalIncome,
    totalExpenses,
  };
};

export const getSpendingByCategory = (transactions) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const categories = {};

  expenses.forEach((t) => {
    categories[t.category] = (categories[t.category] || 0) + t.amount;
  });

  return Object.entries(categories).map(([name, value]) => ({ name, value }));
};

export const getBalanceTrend = (transactions) => {
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const monthDate = subMonths(now, i);
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const monthLabel = format(monthDate, 'MMM');

    const monthTransactions = transactions.filter((t) => {
      const date = parseISO(t.date);
      return isWithinInterval(date, { start: monthStart, end: monthEnd });
    });

    const income = monthTransactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = monthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    months.push({
      name: monthLabel,
      income,
      expense,
      balance: income - expense,
    });
  }

  return months;
};

export const getInsights = (transactions) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const income = transactions.filter((t) => t.type === 'income');

  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);
  const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);

  const categorySpending = getSpendingByCategory(transactions);
  const highestCategory = categorySpending.sort((a, b) => b.value - a.value)[0];

  const savingRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  const last30Days = expenses.filter(t => {
    const date = parseISO(t.date);
    const thirtyDaysAgo = subMonths(new Date(), 1);
    return date >= thirtyDaysAgo;
  });
  const avgDailySpending = last30Days.reduce((acc, t) => acc + t.amount, 0) / 30;

  return {
    highestCategory,
    savingRate,
    avgDailySpending,
    topCategories: categorySpending.slice(0, 3),
  };
};
