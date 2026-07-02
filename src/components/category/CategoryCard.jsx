import React from 'react';
import { Link } from 'react-router-dom';

export function CategoryCard({ category, shape = 'circle' }) {
  const isCircle = shape === 'circle';

  if (isCircle) {
    return (
      <Link
        to={`/products?category=${category.slug || category.name}`}
        className="group relative flex flex-col aspect-[4/5] w-full rounded-2xl overflow-hidden border border-border bg-white shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 cursor-pointer select-none"
      >
        {/* Image Wrapper with hover zoom */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Elegant dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
        </div>

        {/* Glassmorphic border ring (gold accent) on hover */}
        <div className="absolute inset-0 border border-transparent group-hover:border-secondary/40 rounded-2xl transition-all duration-300 pointer-events-none z-20" />

        {/* Content Overlay */}
        <div className="relative mt-auto p-4 z-10 flex flex-col items-start w-full">
          {/* Gold item count indicator */}
          <span className="text-[11px] font-mono font-bold tracking-widest text-secondary-light uppercase mb-1">
            {category.displayCount || 0} Items
          </span>
          {/* Category Name */}
          <h3 className="font-display text-sm md:text-base font-bold text-text-inverse group-hover:text-secondary-light transition-colors leading-tight">
            {category.name}
          </h3>
          {/* Animated "Explore" CTA link */}
          <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-text-inverse/70 group-hover:text-text-inverse transition-colors">
            <span>Explore</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </div>
        </div>
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
