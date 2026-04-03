import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { MOCK_TRANSACTIONS } from '../utils/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState('Admin');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(MOCK_TRANSACTIONS);
    }
    
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = (t) => {
    if (role !== 'Admin') return;
    const newTransaction = { ...t, id: crypto.randomUUID() };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (id, t) => {
    if (role !== 'Admin') return;
    setTransactions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...t } : item))
    );
  };

  const deleteTransaction = (id) => {
    if (role !== 'Admin') return;
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const value = useMemo(() => ({
    transactions,
    role,
    darkMode,
    setRole,
    setDarkMode,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    isLoading
  }), [transactions, role, darkMode, isLoading]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
