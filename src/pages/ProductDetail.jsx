import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';

export function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Find product by slug or numeric id
  const product = productsData.find((p) => p.slug === slug || p.id === parseInt(slug));

  // Additional states for image gallery & modal
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});

  // Generate fallback gallery images for testing
  const galleryImages = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) {
      return product.images.map((img, idx) => {
        let url = img.url;
        if (url.startsWith('/images/products/') || url === '/placeholder.jpg') {
          const placeholdersList = [
            "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop&q=80", // Chips / Clear Quartz
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80", // Pencil Crystal
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop&q=80", // Tumble / Rose Quartz
            "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600&auto=format&fit=crop&q=80", // Oval / Green Jade
            "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=600&auto=format&fit=crop&q=80", // Pyramid / Yellow Jade
            "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&auto=format&fit=crop&q=80"  // Ball / Obsidian
          ];
          const baseIndex = (product.id + idx) % placeholdersList.length;
          url = placeholdersList[baseIndex];
        }
        return url;
      });
    }
    const mainImg = product.image || '/placeholder.jpg';
    return [mainImg];
  }, [product]);

  // Related products query (same category)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productsData
      .filter((p) => p.category?.id === product.category?.id && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="section container-app text-center py-20 bg-bg">
        <h2 className="text-primary font-bold text-2xl font-display">Gemstone Not Found</h2>
        <p className="text-text-secondary mt-4">The gemstone catalog reference does not exist or has been removed.</p>
        <Link to="/products" className="btn-primary mt-6 inline-block">Back to Catalog</Link>
      </div>
    );
  }

  const hasDiscount = product.salePrice !== null && product.salePrice !== undefined;
  const isInStock = product.stockQuantity > 0;
  const ratingVal = product.averageRating !== undefined ? product.averageRating : (product.rating || 0);
  const reviewsVal = product.totalReviews !== undefined ? product.totalReviews : (product.reviewsCount || 0);

  // Zoom-on-hover mouse tracking
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.25)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  // Direct checkout routing
  const handleBuyNow = () => {
    if (isInStock) {
      addToCart({
        ...product,
        price: hasDiscount ? product.salePrice : product.price,
        originalPrice: hasDiscount ? product.price : null,
        image: galleryImages[0]
      });
      navigate('/cart');
    }
  };

  return (
    <div className="bg-bg min-h-screen py-12">
      {/* Dynamic inline styles for subtle pulsing cart button */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 4px 12px rgba(200, 155, 60, 0.2);
          }
          50% {
            box-shadow: 0 4px 22px rgba(200, 155, 60, 0.45);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2.5s infinite ease-in-out;
        }
      `}} />

      <div className="container-app">
        {/* Breadcrumb */}
        <nav className="flex space-x-2 text-xs text-text-secondary mb-8 select-none font-sans">
          <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-secondary transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-primary font-semibold truncate max-w-[200px] md:max-w-none">{product.name}</span>
        </nav>
 
        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
          
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* Main Showcase Image (Hover to zoom) */}
            <div className="relative aspect-square overflow-hidden bg-bg-section border border-border/80 rounded-2xl flex items-center justify-center shadow-xs select-none group z-10">
              <div 
                className="w-full h-full cursor-zoom-in overflow-hidden relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img 
                  src={galleryImages[activeImgIndex]} 
                  alt={product.name} 
                  style={zoomStyle}
                  className="w-full h-full object-cover transition-transform duration-100 ease-out" 
                />
              </div>

              {/* Fullscreen Button */}
              <button 
                onClick={() => setIsFullscreenOpen(true)}
                className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs text-primary border border-border p-2.5 rounded-full shadow-md hover:bg-secondary hover:text-primary transition-all duration-200 cursor-pointer"
                title="View Fullscreen"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m5.25 11.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
                </svg>
              </button>

              {hasDiscount && (
                <span className="absolute top-4 left-4 bg-primary text-text-inverse text-[11px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm select-none">
                  Sale
                </span>
              )}
            </div>

            {/* Thumbnail Carousel Selector */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-1 scrollbar-none select-none">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-white shrink-0 ${
                      activeImgIndex === idx ? 'border-secondary shadow-md scale-102' : 'border-border/60 hover:border-secondary/50'
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            
            {/* Laboratory Certification Badge */}
            <div className="bg-[#FAF8F5] border border-border/80 p-4 rounded-xl flex items-center space-x-3.5 shadow-xs select-none">
              <div className="text-accent-emerald shrink-0">
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
              {/* Category label and Stock status */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  {product.category?.name || product.category}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  isInStock 
                    ? 'bg-success/10 text-emerald-700' 
                    : 'bg-error/10 text-red-600'
                }`}>
                  {isInStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl md:text-3xl font-display font-bold text-primary leading-tight">
                {product.name}
              </h1>

              {/* Star Rating Reviews */}
              <div className="flex items-center space-x-2.5 mt-3 select-none">
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

            {/* Astrological Vedic Attributes Row */}
            {product.spiritualAttributes && (
              <div className="grid grid-cols-3 gap-3 bg-bg-section/55 p-3 rounded-2xl border border-border/50 select-none">
                <div className="flex flex-col items-center justify-center p-2 text-center bg-white rounded-xl border border-border/40">
                  <span className="text-[9px] uppercase tracking-wider text-text-muted font-bold mb-0.5">Ruler Planet</span>
                  <span className="text-xs font-semibold text-primary font-mono">{product.spiritualAttributes.planet || 'N/A'}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 text-center bg-white rounded-xl border border-border/40">
                  <span className="text-[9px] uppercase tracking-wider text-text-muted font-bold mb-0.5">Core Chakra</span>
                  <span className="text-xs font-semibold text-primary font-mono">{product.spiritualAttributes.chakra || 'N/A'}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 text-center bg-white rounded-xl border border-border/40">
                  <span className="text-[9px] uppercase tracking-wider text-text-muted font-bold mb-0.5">Element</span>
                  <span className="text-xs font-semibold text-primary font-mono">{product.spiritualAttributes.element || 'N/A'}</span>
                </div>
              </div>
            )}

            {/* Price Box */}
            <div className="bg-bg p-4 rounded-xl border border-border/65 flex items-center justify-between">
              <div className="flex items-baseline space-x-3">
                {hasDiscount ? (
                  <>
                    <span className="text-3xl font-bold text-secondary-dark font-mono">
                      ₹{product.salePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-text-muted line-through font-mono">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-primary font-mono">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <span className="bg-accent-emerald/10 text-accent-emerald text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {Math.round(((product.price - product.salePrice) / product.price) * 100)}% Off
                </span>
              )}
            </div>

            {/* Product Overview */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Overview</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

            {/* Specifications Cards Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Specifications</h3>
              <div className="grid grid-cols-2 gap-3.5 text-sm">
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <span className="text-text-muted">Weight</span>
                  <span className="font-semibold text-primary font-mono">{product.weight || 'Natural'}</span>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <span className="text-text-muted">Faceted Cut</span>
                  <span className="font-semibold text-primary">{product.cut || 'Cabochon / Raw'}</span>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <span className="text-text-muted">Clarity Rating</span>
                  <span className="font-semibold text-primary">{product.clarity || 'Standard / Eye Clean'}</span>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <span className="text-text-muted">Authentic Origin</span>
                  <span className="font-semibold text-primary">{product.origin || 'Imported'}</span>
                </div>
              </div>
              {product.certified && (
                <div className="flex justify-between items-center text-sm bg-bg-section/30 p-2.5 rounded-lg border border-border/40 mt-1 select-none">
                  <span className="text-text-muted">Lab Certification</span>
                  <span className="font-bold text-secondary-dark">{product.certified}</span>
                </div>
              )}
            </div>

            {/* Action buttons (CTAs) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border/80">
              <button
                onClick={() => {
                  if (isInStock) {
                    addToCart({
                      ...product,
                      price: hasDiscount ? product.salePrice : product.price,
                      originalPrice: hasDiscount ? product.price : null,
                      image: galleryImages[0]
                    });
                  }
                }}
                disabled={!isInStock}
                className={`flex-grow text-center font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full shadow-md transition-all duration-300 cursor-pointer animate-pulse-glow ${
                  isInStock 
                    ? 'bg-gradient-to-r from-secondary via-secondary-light to-secondary text-primary shadow-secondary/15 hover:shadow-secondary/35 hover:scale-102' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isInStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={!isInStock}
                className={`flex-grow text-center font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full shadow-md transition-all duration-300 cursor-pointer ${
                  isInStock 
                    ? 'bg-primary text-white hover:bg-secondary hover:text-primary hover:scale-102' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Buy Now
              </button>
            </div>

            {/* WhatsApp / Consult Link */}
            <div className="text-center">
              <a 
                href="https://wa.me/919999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary hover:text-secondary-dark transition-colors duration-200 select-none"
              >
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.703-4.298 9.706-9.702.002-2.618-1.013-5.079-2.859-6.927C16.278 2.13 13.82 1.11 11.992 1.11c-5.406 0-9.707 4.302-9.709 9.705-.001 1.513.407 2.99 1.185 4.336L2.45 21.03l6.197-1.625 1.01-.61z" />
                </svg>
                Inquire via WhatsApp Consult
              </a>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-4 text-center pt-4 text-[10px] sm:text-[11px] text-text-secondary border-t border-border/60 select-none">
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

        {/* SECTION 4: Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-border/60 pt-16">
            <div className="mb-8">
              <span className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-secondary font-bold">
                ✦ DISCOVER MORE ✦
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mt-2">
                Related Gemstones
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fadeIn select-none">
          <button 
            onClick={() => setIsFullscreenOpen(false)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full p-2.5 cursor-pointer shadow-lg transition-all"
            aria-label="Close Lightbox"
          >
            ✕
          </button>
          
          <div className="relative max-w-4xl max-h-[85vh] px-4 flex flex-col items-center">
            <img 
              src={galleryImages[activeImgIndex]} 
              alt={product.name} 
              className="max-w-full max-h-[75vh] object-contain rounded-lg border border-white/10" 
            />
            {galleryImages.length > 1 && (
              <div className="flex gap-2.5 justify-center mt-5 overflow-x-auto pb-1 max-w-full scrollbar-none">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-12 h-12 rounded border-2 overflow-hidden transition-all shrink-0 ${
                      activeImgIndex === idx ? 'border-secondary scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
