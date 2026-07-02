import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Import slide assets
import hero1 from '../../assets/images/hero-1.png';
import hero2 from '../../assets/images/hero-2.png';
import hero3 from '../../assets/images/hero-3.png';
import hero4 from '../../assets/images/hero-4.png';
import hero5 from '../../assets/images/hero-5.png';

export function HeroCarousel({ slides = [] }) {
  // Setup default slides if not provided
  const defaultSlides = [
    { image: hero1, caption: 'Experience Eternal Vibrance' },
    { image: hero2, caption: 'Natural Gemstone Brilliance' },
    { image: hero3, caption: 'Handcrafted Vedic Treasures' },
    { image: hero4, caption: 'Authentic Astrological Quality' },
    { image: hero5, caption: 'Vedic Prosperity Alignment' },
  ];

  const activeSlides = slides.length > 0 ? slides : defaultSlides;
  const totalSlides = activeSlides.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const autoplayTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay management (switches every 4.5 seconds for optimal duration)
  useEffect(() => {
    if (isPaused) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Pause autoplay and queue a resume timeout (8s after last interaction)
  const startInteraction = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const endInteraction = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  }, []);

  const handleNext = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    nextSlide();
    startInteraction();
    endInteraction();
  };

  const handlePrev = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    prevSlide();
    startInteraction();
    endInteraction();
  };

  const handleDotClick = (index, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setCurrentIndex(index);
    startInteraction();
    endInteraction();
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    startInteraction();
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    endInteraction();
  };

  return (
    <section 
      className="relative w-full aspect-[16/9] sm:aspect-[1920/520] flex items-center justify-start bg-primary text-text-inverse overflow-hidden border-b border-border"
      aria-label="Hero Showcase"
    >
      {/* Background Images Carousel Wrapper */}
      <div 
        className="absolute inset-0 w-full h-full select-none outline-none group bg-primary/5 z-0"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={startInteraction}
        onMouseLeave={endInteraction}
        onFocus={startInteraction}
        onBlur={endInteraction}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Hero Image Background Slider"
      >
        {activeSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <Link
              key={index}
              to="/products"
              className={`absolute inset-0 w-full h-full cursor-pointer ${
                reducedMotion ? '' : 'transition-opacity duration-700 ease-in-out'
              } ${isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt={slide.caption}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </Link>
          );
        })}

        {/* Navigation Arrows */}
        <button
          onClick={(e) => handlePrev(e)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-text-inverse transition-colors backdrop-blur-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
          aria-label="Previous Slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={(e) => handleNext(e)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-text-inverse transition-colors backdrop-blur-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
          aria-label="Next Slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {activeSlides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handleDotClick(index, e)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex 
                  ? 'bg-secondary w-6' 
                  : 'bg-secondary/40 hover:bg-secondary/70 w-2.5'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;
