import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const hasDiscount = product.salePrice !== null && product.salePrice !== undefined;
  const isOutOfStock = product.stockQuantity === 0;
  
  // Calculate discount percentage
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : 0;

  // Placeholders list of verified working image URLs
  const placeholders = [
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop&q=80", // Chips / Clear Quartz
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80", // Pencil Crystal
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop&q=80", // Tumble / Rose Quartz
    "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600&auto=format&fit=crop&q=80", // Oval / Green Jade
    "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=600&auto=format&fit=crop&q=80", // Pyramid / Yellow Jade
    "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&auto=format&fit=crop&q=80"  // Ball / Obsidian
  ];

  // Retrieve primary image or fallback
  let primaryImg = product.images?.find((img) => img.isPrimary)?.url || product.images?.[0]?.url || '/placeholder.jpg';

  // Fallback to high-quality placeholders for local paths that don't exist
  if (primaryImg && (primaryImg.startsWith('/images/products/') || primaryImg === '/placeholder.jpg')) {
    const index = product.id % placeholders.length;
    primaryImg = placeholders[index];
  }

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      // Structure standard cart item
      addToCart({
        ...product,
        // Ensure cart functions read price correctly if there is a discount
        price: hasDiscount ? product.salePrice : product.price,
        originalPrice: hasDiscount ? product.price : null,
        image: primaryImg
      });
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="card group overflow-hidden flex flex-col h-full bg-white transition-all duration-300"
    >
      {/* Product Image Wrapper (4:5 Aspect Ratio) */}
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-section flex items-center justify-center">
        <img 
          src={primaryImg} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 ${
            isOutOfStock ? 'filter grayscale-[40%] opacity-70' : ''
          }`}
          loading="lazy"
          draggable={false}
        />

        {/* Badge Row (top-left, stacking vertically) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {/* New Arrival Badge */}
          {product.isNewArrival && (
            <span className="bg-accent-emerald text-text-inverse text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
              New
            </span>
          )}

          {/* Bestseller Badge */}
          {product.isFeatured && (
            <span className="bg-secondary text-primary text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
              Bestseller
            </span>
          )}

          {/* Sale Percentage Off Badge */}
          {hasDiscount && (
            <span className="bg-primary text-text-inverse text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button (top-right) */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-xs text-primary shadow-sm hover:bg-white hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg 
            className={`w-4.5 h-4.5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'fill-none text-current hover:fill-red-500 hover:text-red-500'}`} 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
            />
          </svg>
        </button>

        {/* Out of Stock Overlay Text */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-[1px] flex items-center justify-center z-5">
            <span className="bg-primary/90 text-text-inverse text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category + Stone Caption */}
        <span className="text-xs text-text-muted font-medium mb-1 uppercase tracking-wide">
          {product.category?.name || 'Gemstone'} &middot; {product.spiritualAttributes?.stone || 'Natural'}
        </span>

        {/* Product Name */}
        <h3 className="text-[15px] font-sans font-medium text-primary line-clamp-2 leading-snug min-h-[40px] mb-1 group-hover:text-secondary-dark transition-colors duration-200">
          {product.name}
        </h3>

        {/* Star Rating & Reviews Count */}
        {product.totalReviews > 0 ? (
          <div className="flex items-center space-x-1.5 mb-2 select-none">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.averageRating) 
                      ? 'fill-current text-secondary' 
                      : 'text-gray-300 stroke-current fill-none'
                  }`} 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.25.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.97-2.883a1 1 0 00-1.18 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.49 10.11c-.773-.56-.375-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" 
                  />
                </svg>
              ))}
            </div>
            <span className="text-[12px] text-text-muted font-mono">({product.totalReviews})</span>
          </div>
        ) : (
          <div className="h-5" /> // Spacer to prevent alignment shifting
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Urgency Stock Alert Line */}
        {product.stockQuantity <= product.lowStockThreshold && product.stockQuantity > 0 && (
          <p className="text-primary text-[11px] font-semibold tracking-wide mb-2 animate-pulse">
            Only {product.stockQuantity} left in stock!
          </p>
        )}

        {/* Price Row & Quick-Add CTA */}
        <div className="pt-3 border-t border-border flex items-center justify-between min-h-[48px] mt-auto">
          {isOutOfStock ? (
            <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
              Out of Stock
            </span>
          ) : (
            <div className="flex flex-col">
              {hasDiscount ? (
                <>
                  <span className="text-[11px] text-text-muted line-through leading-none mb-0.5 font-mono">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="price text-base font-semibold text-secondary-dark font-mono">
                    ₹{product.salePrice.toLocaleString('en-IN')}
                  </span>
                </>
              ) : (
                <span className="price text-base font-semibold text-primary font-mono">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          )}

          {/* Quick-Add Button (hidden if out of stock, fades in on hover for desktop) */}
          {!isOutOfStock && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuickAdd}
              className="opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 cursor-pointer min-h-[36px] w-[36px] p-0 flex items-center justify-center rounded-full"
              aria-label="Add to cart"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" 
                />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
