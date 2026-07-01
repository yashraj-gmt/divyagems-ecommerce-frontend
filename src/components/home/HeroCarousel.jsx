import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from '../common/Button';
import YantraMotif from '../common/YantraMotif';

// Import slide assets
import heroImg from '../../assets/hero.png';
import prod1Img from '../../assets/images/product-1.jpeg';
import prod2Img from '../../assets/images/product-2.jpeg';
import prod3Img from '../../assets/images/product-3.jpg';

export function HeroCarousel({ slides = [] }) {
  // Setup default slides if not provided
  const defaultSlides = [
    { image: heroImg, caption: 'Experience Eternal Vibrance' },
    { image: prod1Img, caption: 'Natural Gemstone Brilliance' },
    { image: prod2Img, caption: 'Handcrafted Vedic Treasures' },
    { image: prod3Img, caption: 'Authentic Astrological Quality' },
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

  const handleNext = () => {
    nextSlide();
    startInteraction();
    endInteraction();
  };

  const handlePrev = () => {
    prevSlide();
    startInteraction();
    endInteraction();
  };

  const handleDotClick = (index) => {
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
      className="relative w-full h-[75vh] sm:h-[80vh] md:h-[85vh] flex items-center justify-start bg-primary text-text-inverse overflow-hidden border-b border-border"
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
            <div
              key={index}
              className={`absolute inset-0 w-full h-full ${
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
            </div>
          );
        })}

        {/* 
          Readability Overlay:
          - Uses a custom gradient fading from deep primary brand maroon on the left to transparent on the right on desktop.
          - Switches to a solid semi-transparent overlay on mobile screens to ensure perfect readability of the white content text.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent max-md:bg-black/70 z-10" />

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-text-inverse transition-colors backdrop-blur-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
          aria-label="Previous Slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
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
              onClick={() => handleDotClick(index)}
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

      {/* Floating Left Content Overlay */}
      <div className="container-app relative z-20 w-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 pointer-events-none">
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl space-y-6 pointer-events-auto select-text">
          <span className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-secondary font-semibold">
            SINCE 2001 · TRUSTED BY 10,000+
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-inverse leading-tight">
            Discover Pure Astrological Radiance
          </h1>
          <p className="text-text-inverse/85 text-base md:text-lg max-w-lg leading-relaxed">
            Sourced ethically and energized according to sacred Vedic protocols. Find the genuine Jyotish gemstone tailored to align with your birth chart.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button variant="primary" as="Link" to="/products">
              Explore Collection
            </Button>
            <Button 
              variant="outline" 
              className="!text-text-inverse hover:!text-primary border-text-inverse/60 hover:bg-text-inverse" 
              as="Link" 
              to="/contact"
            >
              Free Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Micro-caption (bottom-right of slide overlay) */}
      <span className="absolute bottom-6 right-6 z-20 font-mono text-[10px] md:text-xs uppercase tracking-widest text-text-inverse bg-primary/75 px-3 py-1.5 rounded-md backdrop-blur-xs shadow-sm select-none pointer-events-none hidden sm:inline-block">
        {activeSlides[currentIndex].caption}
      </span>

      {/* Yantra Motif Watermark Background */}
      <YantraMotif 
        className="opacity-10 text-secondary absolute -bottom-10 -right-10 w-64 h-64 pointer-events-none z-10" 
      />
    </section>
  );
}

export default HeroCarousel;
