import { subMonths, format, startOfMonth, endOfMonth } from 'date-fns';

export const CATEGORIES = [
  'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Education', 'Salary', 'Freelance', 'Investment'
];

export const TRANSACTION_TYPES = ['income', 'expense'];

const generateMockTransactions = () => {
  const transactions = [];
  const now = new Date();

  // Salary for each month
  for (let i = 0; i < 6; i++) {
    const date = startOfMonth(subMonths(now, i));
    transactions.push({
      id: `salary-${i}`,
      date: format(date, 'yyyy-MM-dd'),
      description: 'Monthly Salary',
      category: 'Salary',
      amount: 5000,
      type: 'income',
    });
  }

  // Freelance income
  transactions.push({
    id: 'freelance-1',
    date: format(subMonths(now, 1), 'yyyy-MM-15'),
    description: 'Web Design Project',
    category: 'Freelance',
    amount: 1200,
    type: 'income',
  });

  // Expenses
  const expenseDescriptions = {
    Food: ['Grocery Store', 'Restaurant', 'Coffee Shop', 'Dinner Out'],
    Transport: ['Uber Ride', 'Gas Station', 'Public Transit', 'Train Ticket'],
    Shopping: ['Amazon Purchase', 'Clothing Store', 'Electronics', 'Home Decor'],
    Bills: ['Electricity Bill', 'Water Bill', 'Internet Subscription', 'Phone Bill'],
    Entertainment: ['Netflix Subscription', 'Movie Tickets', 'Gaming', 'Concert'],
    Health: ['Pharmacy', 'Doctor Visit', 'Gym Membership', 'Health Insurance'],
    Education: ['Online Course', 'Books', 'Workshop Fee'],
  };

  for (let i = 0; i < 40; i++) {
    const category = CATEGORIES[Math.floor(Math.random() * 7)];
    const descriptions = expenseDescriptions[category];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const date = subMonths(now, Math.floor(Math.random() * 6));
    date.setDate(Math.floor(Math.random() * 28) + 1);

    transactions.push({
      id: `expense-${i}`,
      date: format(date, 'yyyy-MM-dd'),
      description,
      category,
      amount: Math.floor(Math.random() * 300) + 10,
      type: 'expense',
    });
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const MOCK_TRANSACTIONS = generateMockTransactions();
