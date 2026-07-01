import React from 'react';
import { Link } from 'react-router-dom';

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  as = 'button',
  fullWidth = false,
  iconLeft,
  iconRight,
  disabled = false,
  loading = false,
  ...props
}) {
  const Element = as === 'Link' ? Link : as;

  // Base classes
  const baseClasses = 'relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 cursor-pointer rounded-full min-h-[44px] focus:outline-none focus:ring-2 focus:ring-secondary/50 select-none';

  // Variant classes
  const variantClasses = {
    primary: 'bg-primary text-text-inverse hover:bg-primary-light hover:-translate-y-0.5',
    secondary: 'bg-secondary text-primary hover:bg-secondary-dark',
    outline: 'border border-secondary text-primary hover:bg-secondary',
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-2.5',
    lg: 'text-lg px-8 py-3.5',
  };

  const isDisabled = disabled || loading;

  const combinedClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    fullWidth ? 'w-full' : '',
    isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Element
      className={combinedClasses}
      disabled={as === 'button' ? isDisabled : undefined}
      role={as !== 'button' ? 'button' : undefined}
      aria-disabled={isDisabled || undefined}
      {...props}
    >
      <span className={loading ? 'opacity-0 flex items-center gap-2' : 'flex items-center gap-2'}>
        {iconLeft && !loading && <span className="inline-flex items-center">{iconLeft}</span>}
        {children}
        {iconRight && !loading && <span className="inline-flex items-center">{iconRight}</span>}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
      )}
    </Element>
  );
}

export default Button;
