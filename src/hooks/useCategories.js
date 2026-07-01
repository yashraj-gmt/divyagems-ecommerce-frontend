import { useState, useEffect } from 'react';
import categoriesData from '../data/categories.json';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCategories(categoriesData);
    setLoading(false);
  }, []);

  return { categories, loading };
}

export default useCategories;
