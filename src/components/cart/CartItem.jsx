import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function CartItem({ item, onUpdateQuantity, onRemove, readOnly = false }) {
  const stockLimit = item.stockQuantity !== undefined ? item.stockQuantity : 99;
  const isOverstocked = item.quantity > stockLimit;
  
  // Fade-out transition state
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Auto-clamp when quantity exceeds stock (only if not readOnly)
  useEffect(() => {
    if (readOnly) return;
    if (isOverstocked) {
      onUpdateQuantity(item.id, stockLimit);
    }
  }, [item.quantity, stockLimit, isOverstocked, item.id, onUpdateQuantity, readOnly]);

  const handleRemoveClick = () => {
    if (readOnly) return;
    setIsFadingOut(true);
    setTimeout(() => {
      onRemove(item.id);
    }, 200); // 200ms animation fade-out
  };

  const handleIncrement = () => {
    if (readOnly) return;
    if (item.quantity < stockLimit) {
      onUpdateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (readOnly) return;
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    } else {
      handleRemoveClick();
    }
  };

  // Resolve image source
  const imgUrl = item.image || '/placeholder.jpg';
  const categoryLabel = typeof item.category === 'object' ? item.category?.name : item.category;

  return (
    <div 
      className={`flex items-start md:items-center justify-between gap-4 py-6 border-b border-border/80 transition-all duration-200 ${
        isFadingOut ? 'opacity-0 scale-95 h-0 py-0 overflow-hidden' : 'opacity-100'
      }`}
    >
      {/* Product Image & Meta */}
      <div className="flex gap-4 items-start md:items-center flex-1">
        <Link to={`/products/${item.id}`} className="shrink-0 group">
          <img 
            src={imgUrl} 
            alt={item.name} 
            className="w-20 h-20 md:w-24 md:h-24 rounded-md object-cover border border-border/60 group-hover:opacity-90 transition-opacity"
          />
        </Link>

        <div className="space-y-1">
          {/* Category & Stone Type Caption */}
          <span className="block text-[11px] font-bold text-text-muted uppercase tracking-wider font-mono">
            {categoryLabel || 'Gemstone'} &middot; {item.stoneType || 'Natural'}
          </span>
          
          <Link 
            to={`/products/${item.id}`}
            className="block text-sm md:text-base font-medium text-primary hover:text-secondary transition-colors leading-tight font-sans"
          >
            {item.name}
          </Link>

          {/* Selected Variant (if any) */}
          {item.selectedVariant && (
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-sans mt-0.5">
              <span 
                className="w-2.5 h-2.5 rounded-full border border-border inline-block"
                style={{ backgroundColor: item.selectedVariant.colorCode || '#E2D5B8' }}
              />
              <span>{item.selectedVariant.name}</span>
            </div>
          )}

          {/* Overstock Warning */}
          {isOverstocked && !readOnly && (
            <p className="text-primary text-xs font-semibold mt-1 font-sans">
              Only {stockLimit} left &mdash; quantity adjusted
            </p>
          )}
        </div>
      </div>

      {/* Stepper, Prices, and Trash columns */}
      <div className="flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-8 justify-between md:min-w-[280px]">
        {/* Quantity Stepper */}
        {readOnly ? (
          <div className="text-xs sm:text-sm text-text-muted font-sans font-semibold border border-border rounded bg-bg/50 px-3 py-1.5 select-none">
            Qty: {item.quantity}
          </div>
        ) : (
          <div className="flex items-center border border-border rounded bg-bg overflow-hidden font-sans">
            <button 
              type="button"
              onClick={handleDecrement}
              className="px-2.5 py-1.5 text-text-muted hover:text-primary hover:bg-white border-r border-border transition-colors duration-150 flex items-center justify-center cursor-pointer min-w-[32px]"
              aria-label="Decrease quantity"
            >
              {item.quantity === 1 ? (
                // Trash icon
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.78 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              ) : '−'}
            </button>

            <span className="px-3.5 font-semibold text-primary text-xs sm:text-sm select-none">
              {item.quantity}
            </span>

            <button 
              type="button"
              onClick={handleIncrement}
              disabled={item.quantity >= stockLimit}
              className={`px-2.5 py-1.5 text-text-muted hover:text-primary hover:bg-white border-l border-border transition-colors duration-150 flex items-center justify-center cursor-pointer min-w-[32px] ${
                item.quantity >= stockLimit ? 'opacity-40 cursor-not-allowed bg-border/20' : ''
              }`}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}

        {/* Pricing Detail column */}
        <div className="text-right flex flex-col justify-center min-w-[90px]">
          <span className="price font-mono font-bold text-primary text-sm sm:text-base">
            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
          </span>
          
          {item.priceAtAddTime !== undefined && item.priceAtAddTime !== item.price && !readOnly && (
            <span className="block text-[10px] text-text-muted font-sans font-medium mt-0.5">
              Price updated since added
            </span>
          )}
        </div>

        {/* Trash/Remove Button top-right or right side */}
        {!readOnly && (
          <button 
            onClick={handleRemoveClick}
            className="text-text-muted hover:text-primary p-1 cursor-pointer transition-colors"
            aria-label="Remove item"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.78 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        )}
      </div>

    </div>
  );
}

export default CartItem;
