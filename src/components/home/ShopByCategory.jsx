import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import CategoryGrid from '../category/CategoryGrid';
import useCategories from '../../hooks/useCategories';

export function ShopByCategory() {
  const { categories: allCategories, loading } = useCategories();
  const gridColumns = 6;

  if (loading) {
    return (
      <section className="section section-alt py-16 bg-bg-section flex items-center justify-center min-h-[300px]">
        <svg className="animate-spin h-8 w-8 text-secondary" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </section>
    );
  }

  const categories = allCategories.filter(cat => cat.id !== 'shiva-lingam');
  const showViewAll = categories.length > gridColumns;

  return (
    <section className="section section-alt bg-bg-section relative py-16 md:py-20 overflow-hidden">
      <div className="container-app">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <SectionHeading
            eyebrow="BROWSE OUR RANGE"
            title="Shop By Category"
            align="left"
            className="flex-grow"
          />
          {showViewAll && (
            <Link
              to="/products"
              className="text-secondary font-semibold text-sm sm:text-base hover:text-secondary-dark hover:underline transition-colors cursor-pointer self-start sm:self-end pb-2"
            >
              View All Categories &rarr;
            </Link>
          )}
        </div>

        {/* Category Circular Cards Grid */}
        <CategoryGrid categories={categories} shape="circle" />
      </div>
    </section>
  );
}

export default ShopByCategory;
