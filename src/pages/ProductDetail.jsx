import React from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  // Find product by id or slug
  const product = productsData.find((p) => p.id === parseInt(id) || p.slug === id);

  if (!product) {
    return (
      <div className="section container-app text-center py-20 bg-bg">
        <h2 className="text-primary font-bold text-2xl">Gemstone Not Found</h2>
        <p className="text-text-secondary mt-4">The gemstone catalog reference does not exist or has been removed.</p>
        <Link to="/products" className="btn-primary mt-6 inline-block">Back to Catalog</Link>
      </div>
    );
  }

  const hasDiscount = product.salePrice !== null && product.salePrice !== undefined;
  const isInStock = product.stockQuantity > 0;
  const ratingVal = product.averageRating !== undefined ? product.averageRating : (product.rating || 0);
  const reviewsVal = product.totalReviews !== undefined ? product.totalReviews : (product.reviewsCount || 0);

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
  let primaryImg = product.images?.find((img) => img.isPrimary)?.url || product.images?.[0]?.url || product.image || '/placeholder.jpg';

  // Fallback to high-quality placeholders for local paths that don't exist
  if (primaryImg && (primaryImg.startsWith('/images/products/') || primaryImg === '/placeholder.jpg')) {
    const index = product.id % placeholders.length;
    primaryImg = placeholders[index];
  }

  return (
    <div className="bg-bg min-h-screen py-12">
      <div className="container-app">
        {/* Breadcrumb */}
        <nav className="flex space-x-2 text-xs text-text-secondary mb-8">
          <Link to="/" className="hover:text-secondary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-secondary">Catalog</Link>
          <span>/</span>
          <span className="text-primary font-semibold truncate max-w-[200px] md:max-w-none">{product.name}</span>
        </nav>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 bg-white p-6 md:p-8 rounded-md border border-border shadow-card">
          
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="aspect-square bg-bg-section border border-border rounded-md overflow-hidden flex items-center justify-center relative">
              <img 
                src={primaryImg} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
              {hasDiscount && (
                <span className="absolute top-4 left-4 bg-primary text-text-inverse text-[11px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                  Sale
                </span>
              )}
            </div>
            
            {/* Laboratory Graded Badge */}
            <div className="bg-[#FAF8F5] border border-border/80 p-4 rounded flex items-center space-x-3.5">
              <div className="text-[#0F4D3A]">
                <svg className="w-8 h-8 text-accent-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-wide">Lab Certified Authentic</h4>
                <p className="text-[11px] text-text-secondary mt-0.5">Government-approved lab certified 100% natural, untreated & astrological grade.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Form */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div>
              {/* Category tag & Stock */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  {product.category?.name || product.category}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${
                  isInStock 
                    ? 'bg-success/10 text-emerald-700' 
                    : 'bg-error/10 text-red-600'
                }`}>
                  {isInStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-primary leading-tight font-sans">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2.5 mt-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(ratingVal) ? 'fill-current text-secondary' : 'text-gray-300 stroke-current fill-none'}`} 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.25.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.97-2.883a1 1 0 00-1.18 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.49 10.11c-.773-.56-.375-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-text-secondary">({reviewsVal} customer reviews)</span>
              </div>
            </div>

            {/* Price block */}
            <div className="bg-bg p-4 rounded-sm border border-border flex items-baseline space-x-3">
              {hasDiscount ? (
                <>
                  <span className="text-2xl md:text-3xl font-bold text-secondary-dark font-mono">
                    ₹{product.salePrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-text-secondary line-through font-mono">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </>
              ) : (
                <span className="text-2xl md:text-3xl font-bold text-primary font-mono">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">Overview</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Gemstone Specifications Table */}
            <div>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Stone Specifications</h3>
              <div className="border border-border rounded-sm overflow-hidden text-sm">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="bg-bg border-b border-border">
                      <td className="px-4 py-2.5 font-semibold text-primary w-1/3">Weight</td>
                      <td className="px-4 py-2.5 text-text-secondary">{product.weight}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-2.5 font-semibold text-primary">Faceted Cut</td>
                      <td className="px-4 py-2.5 text-text-secondary">{product.cut}</td>
                    </tr>
                    <tr className="bg-bg border-b border-border">
                      <td className="px-4 py-2.5 font-semibold text-primary">Clarity Rating</td>
                      <td className="px-4 py-2.5 text-text-secondary">{product.clarity}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-2.5 font-semibold text-primary">Authentic Origin</td>
                      <td className="px-4 py-2.5 text-text-secondary">{product.origin}</td>
                    </tr>
                    <tr className="bg-bg">
                      <td className="px-4 py-2.5 font-semibold text-primary">Lab Report</td>
                      <td className="px-4 py-2.5 text-text-secondary font-medium text-secondary">{product.certified}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
              <button
                onClick={() => {
                  if (isInStock) {
                    addToCart({
                      ...product,
                      price: hasDiscount ? product.salePrice : product.price,
                      originalPrice: hasDiscount ? product.price : null,
                      image: primaryImg
                    });
                  }
                }}
                disabled={!isInStock}
                className={`cursor-pointer flex-grow text-center font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-sm shadow-md transition-all duration-200 ${
                  isInStock 
                    ? 'bg-primary text-white hover:bg-secondary hover:-translate-y-0.5' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isInStock ? 'Add to Shopping Cart' : 'Currently Unavailable'}
              </button>
              
              <Link 
                to="/contact" 
                className="btn border border-primary text-primary hover:bg-primary/5 font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-sm transition-all duration-200 text-center"
              >
                Inquire via WhatsApp / Call
              </Link>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-4 text-center pt-4 text-[11px] text-text-secondary border-t border-border/60">
              <div className="space-y-1">
                <span className="font-bold text-primary block uppercase">Secured Checkouts</span>
                <span>Fully encrypted SSL</span>
              </div>
              <div className="space-y-1 border-x border-border/80">
                <span className="font-bold text-primary block uppercase">Return Policy</span>
                <span>10-Day replacement</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-primary block uppercase">Lifetime Grading</span>
                <span>Astrological potency guarantee</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
