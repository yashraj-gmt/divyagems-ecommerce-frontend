import React from 'react';
import Button from '../common/Button';

// Icon mapper helper
const getServiceIcon = (title) => {
  const iconClass = "w-6 h-6 text-secondary";
  
  if (title.includes("Horoscope")) {
    return (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M7.5 7.5l9 9M7.5 16.5l9-9" />
      </svg>
    );
  }
  if (title.includes("Birth Kundli")) {
    return (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18M3 3l18 18M3 21L21 3" />
      </svg>
    );
  }
  if (title.includes("Recommendation")) {
    return (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    );
  }
  if (title.includes("Business")) {
    return (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21V2.25m0 18.75a9.002 9.002 0 0 0 5-16.747m-5 16.747a9.002 9.002 0 0 1-5-16.747M12 2.25a9.002 9.002 0 0 1 5 3.253m-5-3.253a9.002 9.002 0 0 0-5 3.253zm0 0v18.75" />
      </svg>
    );
  }
  if (title.includes("Career")) {
    return (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    );
  }
  if (title.includes("Health")) {
    return (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    );
  }
  if (title.includes("Site Selection") || title.includes("Remedies") || title.includes("Consultation")) {
    return (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    );
  }
  if (title.includes("Tarot")) {
    return (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v10M9 10h6" />
      </svg>
    );
  }
  if (title.includes("Reiki")) {
    return (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
      </svg>
    );
  }
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 1112.728 0M12 3v9" />
    </svg>
  );
};

export function ServiceCard({ title, price, description, features = [], ctaLabel, onCtaClick }) {
  const isPriced = price !== null && price !== undefined && typeof price === 'number';
  
  return (
    <div className="group flex flex-col h-full p-6 sm:p-7 bg-white rounded-2xl border border-border/60 hover:border-secondary hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 shadow-xs">
      {/* Icon & Pricing Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary-light/10 border border-secondary/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
          {getServiceIcon(title)}
        </div>
        
        <div className="text-right">
          {isPriced ? (
            <span className="font-mono text-xl sm:text-2xl text-secondary-dark font-extrabold leading-none">
              ₹{price.toLocaleString('en-IN')}
            </span>
          ) : (
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-text-muted leading-tight block pt-1.5">
              {price || 'Contact for Pricing'}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-primary text-lg sm:text-xl font-bold leading-snug mt-5 mb-2">
        {title}
      </h3>

      {/* Brief Description */}
      {description && (
        <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed font-sans mb-4">
          {description}
        </p>
      )}
      
      {/* Decorative short divider */}
      <div className="w-12 h-[2px] bg-secondary/30 mb-4" />

      {/* Feature list */}
      <ul className="space-y-2.5 mb-6 flex-grow">
        {features.map((feat, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-text-primary leading-tight font-sans">
            <svg className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span className="text-[13px] text-text-primary leading-normal">{feat}</span>
          </li>
        ))}
      </ul>

      {/* Button at bottom */}
      <div className="mt-auto pt-2">
        <Button 
          variant="primary" 
          fullWidth
          onClick={onCtaClick}
          className="shadow-sm transition-all duration-300 hover:scale-102 uppercase font-bold text-xs tracking-wider rounded-full min-h-[44px]"
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

export default ServiceCard;
