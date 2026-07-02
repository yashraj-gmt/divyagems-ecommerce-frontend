import React, { useState, useRef } from 'react';
import SectionHeading from '../common/SectionHeading';
import ProductCard from '../product/ProductCard';
import Pagination from '../common/Pagination';
import Button from '../common/Button';
import useProducts from '../../hooks/useProducts';
import YantraMotif from '../common/YantraMotif';

export function BestSellers() {
  const { products, loading } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef(null);

  if (loading) {
    return (
      <section className="section py-16 bg-white flex items-center justify-center min-h-[300px]">
        <svg className="animate-spin h-8 w-8 text-secondary" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </section>
    );
  }

  // Filter bestseller products
  const bestsellers = products.filter((product) => product.isBestseller);
  const totalPages = Math.ceil(bestsellers.length / 4); // 4 items per "page" for indicator

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      if (clientWidth > 0) {
        const page = Math.min(
          totalPages,
          Math.max(1, Math.round((scrollLeft / (scrollWidth - clientWidth)) * (totalPages - 1)) + 1)
        );
        setCurrentPage(page);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (scrollRef.current) {
      const { clientWidth, scrollWidth } = scrollRef.current;
      const targetScroll = ((page - 1) / (totalPages - 1)) * (scrollWidth - clientWidth);
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="bestsellers-section" className="section bg-bg py-16 md:py-20 relative overflow-hidden">
      {/* Hide Scrollbar Style Block */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Background Yantra Motif for luxury authentic feel */}
      <YantraMotif 
        className="opacity-[0.03] text-primary absolute -top-12 -left-12 w-80 h-80 pointer-events-none z-0" 
      />

      <div className="container-app relative z-10">
        {/* Section Heading & Navigation Controls */}
        {bestsellers.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
              <div className="max-w-2xl text-left">
                <SectionHeading eyebrow="CUSTOMER FAVOURITES" title="Our Bestsellers" align="left" />
                <p className="text-text-muted text-sm md:text-base mt-2">
                  Handpicked, premium certified natural gemstone favorites chosen by our loyal patrons.
                </p>
              </div>
              {/* Navigation Controls (Desktop only) */}
              <div className="hidden md:flex items-center gap-3 self-end mb-2">
                <button
                  onClick={handleScrollPrev}
                  className="bg-white border border-border text-primary hover:border-secondary hover:text-secondary transition-all duration-200 w-11 h-11 rounded-full flex items-center justify-center shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/30"
                  aria-label="Scroll Left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleScrollNext}
                  className="bg-white border border-border text-primary hover:border-secondary hover:text-secondary transition-all duration-200 w-11 h-11 rounded-full flex items-center justify-center shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/30"
                  aria-label="Scroll Right"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Carousel Outer Wrapper */}
            <div className="relative w-full px-2 sm:px-4">
              
              {/* Subtle Left/Right Fade-Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

              {/* Horizontally Scrollable Row */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-6 px-4"
              >
                {bestsellers.map((product) => (
                  <div
                    key={product.id}
                    className="snap-start shrink-0 w-[260px] sm:w-[280px] md:w-[300px]"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Indicator wired to scroll page state */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {/* View All Button */}
            <div className="flex justify-center mt-10">
              <Button 
                variant="primary" 
                as="Link" 
                to="/products"
                className="shadow-md transition-all duration-300 hover:scale-103 font-bold hover:shadow-lg"
              >
                View All Products
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center text-center mb-10">
              <SectionHeading eyebrow="CUSTOMER FAVOURITES" title="Our Bestsellers" align="center" />
              <p className="text-text-muted text-sm md:text-base mt-2">
                Handpicked, premium certified natural gemstone favorites chosen by our loyal patrons.
              </p>
            </div>
            <div className="text-center py-12 text-text-muted">
              No bestseller products found.
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default BestSellers;
