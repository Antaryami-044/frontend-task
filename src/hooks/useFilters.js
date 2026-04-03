import { useState, useMemo } from 'react';

export const useFilters = (transactions) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) ||
                            t.category.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || t.category === category;
        const matchesType = type === 'All' || t.type === type;
        return matchesSearch && matchesCategory && matchesType;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'date') {
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (sortBy === 'amount') {
          comparison = a.amount - b.amount;
        } else if (sortBy === 'category') {
          comparison = a.category.localeCompare(b.category);
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [transactions, search, category, type, sortBy, sortOrder]);

  return {
    search,
    setSearch,
    category,
    setCategory,
    type,
    setType,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredTransactions,
  };
};
