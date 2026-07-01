import React from 'react';
import { Link } from 'react-router-dom';

export function CategoryCard({ category, shape = 'circle' }) {
  const isCircle = shape === 'circle';

  if (isCircle) {
    return (
      <Link
        to={`/products?category=${category.slug || category.name}`}
        className="group flex flex-col items-center text-center cursor-pointer select-none"
      >
        {/* Circular image container with gold ring border that thickens on hover */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-secondary group-hover:border-4 transition-all duration-300 shadow-card group-hover:shadow-hover">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        {/* Category name below in font-sans medium */}
        <span className="mt-3 font-sans font-medium text-sm md:text-base text-primary group-hover:text-secondary-dark transition-colors duration-200">
          {category.name}
        </span>
      </Link>
    );
  }

  // Fallback / standard layout
  return (
    <Link
      to={`/products?category=${category.slug || category.name}`}
      className="group relative overflow-hidden bg-white rounded-md border border-border shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-all"></div>
      </div>
      <div className="p-4 text-center flex-grow flex flex-col justify-between">
        <h3 className="text-[15px] font-bold text-primary tracking-wide uppercase group-hover:text-secondary transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-text-secondary mt-1.5 line-clamp-2">
          {category.description}
        </p>
        <span className="text-[11px] font-bold text-secondary uppercase tracking-wider mt-3 inline-block">
          View Items &rarr;
        </span>
      </div>
    </Link>
  );
}

export default CategoryCard;
