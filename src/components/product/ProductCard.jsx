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
  const currentPrice = hasDiscount ? product.salePrice : product.price;
  const regularPrice = product.price;

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
      addToCart({
        ...product,
        price: currentPrice,
        originalPrice: hasDiscount ? regularPrice : null,
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
    <article className="group relative flex flex-col h-full bg-white rounded-2xl border border-border/50 shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-bg-section flex items-center justify-center">
        <Link to={`/products/${product.slug || product.id}`} className="block w-full h-full">
          <img 
            src={primaryImg} 
            alt={product.name} 
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isOutOfStock ? 'filter grayscale-[40%] opacity-70' : ''
            }`}
            loading="lazy"
            draggable={false}
          />
        </Link>

        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          {product.isNewArrival && (
            <span className="bg-accent-emerald text-text-inverse text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
              New
            </span>
          )}

          {product.isFeatured && (
            <span className="bg-secondary text-primary text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
              Bestseller
            </span>
          )}

          {hasDiscount && (
            <span className="bg-primary text-text-inverse text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-xs text-primary shadow-sm hover:bg-white hover:text-red-500 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg 
            className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'fill-none text-current hover:fill-red-500 hover:text-red-500'}`} 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2.25"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
            />
          </svg>
        </button>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-[1px] flex items-center justify-center z-5">
            <span className="bg-primary/95 text-text-inverse text-[10px] font-bold px-2.5 py-1 rounded shadow-md uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-3.5 flex flex-col flex-grow">
        <Link to={`/products/${product.slug || product.id}`} className="block">
          <span className="text-[11px] font-mono font-semibold tracking-wider text-secondary-light uppercase mb-1">
            {product.category?.name || 'Gemstone'} &middot; {product.spiritualAttributes?.stone || 'Natural'}
          </span>

          <h3 className="font-sans text-sm md:text-[15px] font-bold text-primary line-clamp-1 mb-1 group-hover:text-secondary-dark transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {product.totalReviews > 0 && (
          <div className="flex items-center space-x-1.5 mb-2 select-none">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-3 h-3 ${
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
            <span className="text-[11px] text-text-muted font-mono">({product.totalReviews})</span>
          </div>
        )}

        <div className="flex-grow" />

        {product.stockQuantity <= product.lowStockThreshold && product.stockQuantity > 0 && (
          <p className="text-primary text-[10px] font-semibold tracking-wide mb-2 animate-pulse">
            Only {product.stockQuantity} left!
          </p>
        )}

        <div className="mt-auto space-y-2">
          {/* Compact Price row */}
          <div className="flex items-baseline justify-between gap-2 py-0.5">
            <div className="flex items-baseline gap-1.5">
              <span className="price text-base font-bold text-primary font-mono">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <span className="text-[11px] text-text-muted line-through font-mono">
                  ₹{regularPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className="text-[10px] font-semibold text-accent-emerald bg-accent-emerald/10 px-2 py-0.5 rounded-full">
                {discountPercent}% Off
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              as={Link}
              to={`/products/${product.slug || product.id}`}
              variant="primary"
              size="sm"
              className="flex-1 min-h-[36px]"
            >
              Buy Now
            </Button>

            {!isOutOfStock && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleQuickAdd}
                className="transition-all duration-300 cursor-pointer min-h-[36px] w-[36px] !p-0 flex items-center justify-center rounded-full !border-secondary hover:!bg-secondary hover:!text-primary hover:scale-105"
                aria-label="Add to cart"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
      </div>
    </article>
  );
}

export default ProductCard;
