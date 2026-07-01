import React from 'react';
import Button from '../common/Button';

export function ServiceCard({ title, price, features = [], ctaLabel, onCtaClick }) {
  // Check if price is a number or requires "Contact for Pricing" text
  const isPriced = price !== null && price !== undefined && typeof price === 'number';
  
  return (
    <div className="card flex flex-col h-full p-6 sm:p-7 bg-white hover:border-secondary hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
      {/* Title & Price Header */}
      <div className="space-y-2">
        <h3 className="font-display text-primary text-lg sm:text-xl font-bold leading-snug">
          {title}
        </h3>
        
        <div className="min-h-[32px] flex items-center">
          {isPriced ? (
            <span className="font-mono text-xl sm:text-2xl text-secondary-dark font-bold">
              ₹{price.toLocaleString('en-IN')}
            </span>
          ) : (
            <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-text-muted">
              {price || 'Contact for Pricing'}
            </span>
          )}
        </div>
      </div>
      
      {/* Decorative short divider */}
      <div className="w-12 h-[2px] bg-secondary/40 my-4" />

      {/* Feature list */}
      <ul className="space-y-3 mb-6 flex-grow">
        {features.map((feat, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-sm text-text-primary leading-tight font-sans">
            {/* Emerald checkmark icon */}
            <svg className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span className="text-[13.5px] text-text-primary leading-normal">{feat}</span>
          </li>
        ))}
      </ul>

      {/* Button at bottom, pinned using mt-auto */}
      <div className="mt-auto pt-2">
        <Button 
          variant="primary" 
          fullWidth
          onClick={onCtaClick}
          className="!bg-btn hover:!bg-btn-hover text-[11px] sm:text-xs uppercase tracking-wider font-bold min-h-[44px]"
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

export default ServiceCard;
