import React from 'react';
import CategoryCard from './CategoryCard';

export function CategoryGrid({ categories = [], shape = 'circle' }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 justify-items-center w-full">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} shape={shape} />
      ))}
    </div>
  );
}

export default CategoryGrid;
