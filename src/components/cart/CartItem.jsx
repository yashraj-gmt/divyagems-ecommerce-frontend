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
      className={`group relative bg-white border border-border/75 rounded-2xl p-4 sm:p-5 shadow-xs mb-4 hover:border-secondary hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isFadingOut ? 'opacity-0 scale-95 h-0 p-0 mb-0 overflow-hidden' : 'opacity-100'
      }`}
    >
      {/* Product Image & Meta info */}
      <div className="flex gap-4 items-start sm:items-center flex-1">
        <Link to={`/products/${item.slug || item.id}`} className="shrink-0 group/img">
          <img 
            src={imgUrl} 
            alt={item.name} 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-border/50 group-hover/img:opacity-90 transition-opacity"
          />
        </Link>

        <div className="space-y-1 text-left">
          {/* Category & Stone Type */}
          <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider font-mono">
            {categoryLabel || 'Gemstone'} &middot; {item.stoneType || 'Natural'}
          </span>
          
          <Link 
            to={`/products/${item.slug || item.id}`}
            className="block text-sm sm:text-base font-semibold text-primary hover:text-secondary transition-colors leading-tight font-sans"
          >
            {item.name}
          </Link>

          {/* Selected Variant (if any) */}
          {item.selectedVariant && (
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-sans mt-1 select-none">
              <span 
                className="w-2.5 h-2.5 rounded-full border border-border inline-block"
                style={{ backgroundColor: item.selectedVariant.colorCode || '#E2D5B8' }}
              />
              <span>{item.selectedVariant.name}</span>
            </div>
          )}

          {/* Overstock Warning */}
          {isOverstocked && !readOnly && (
            <p className="text-[#B23B3B] text-xs font-semibold mt-1 font-sans">
              Only {stockLimit} left &mdash; quantity adjusted
            </p>
          )}
        </div>
      </div>

      {/* Stepper, Prices, and Trash actions */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto shrink-0 border-t border-border/40 pt-3 sm:pt-0 sm:border-0 select-none">
        
        {/* Quantity Stepper */}
        {readOnly ? (
          <div className="text-xs text-text-muted font-sans font-semibold border border-border/80 rounded-full bg-[#FAF8F5] px-4 py-1">
            Qty: {item.quantity}
          </div>
        ) : (
          <div className="flex items-center bg-[#FAF8F5] border border-border/80 rounded-full p-1 gap-2.5">
            <button 
              type="button"
              onClick={handleDecrement}
              className="w-7 h-7 rounded-full bg-white hover:bg-secondary/15 hover:text-secondary-dark flex items-center justify-center transition-all duration-150 cursor-pointer font-bold text-sm shadow-xs border border-border/30"
              aria-label="Decrease quantity"
            >
              {item.quantity === 1 ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.78 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              ) : '−'}
            </button>

            <span className="w-5 text-center font-mono font-bold text-primary text-xs sm:text-sm">
              {item.quantity}
            </span>

            <button 
              type="button"
              onClick={handleIncrement}
              disabled={item.quantity >= stockLimit}
              className={`w-7 h-7 rounded-full bg-white hover:bg-secondary/15 hover:text-secondary-dark flex items-center justify-center transition-all duration-150 cursor-pointer font-bold text-sm shadow-xs border border-border/30 ${
                item.quantity >= stockLimit ? 'opacity-40 cursor-not-allowed bg-border/20' : ''
              }`}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}

        {/* Pricing columns */}
        <div className="text-right flex flex-col justify-center min-w-[90px]">
          <span className="font-mono font-bold text-secondary-dark text-sm sm:text-base">
            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-text-muted font-sans font-medium">
            ₹{item.price.toLocaleString('en-IN')} each
          </span>
        </div>

        {/* Trash Removal Action */}
        {!readOnly && (
          <button 
            onClick={handleRemoveClick}
            className="text-text-muted hover:text-[#B23B3B] p-1.5 cursor-pointer transition-colors hover:scale-105 rounded-full hover:bg-red-50"
            aria-label="Remove item"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.78 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        )}

      </div>
    </div>
  );
}

export default CartItem;
