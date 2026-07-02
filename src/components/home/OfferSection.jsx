import React, { useState } from 'react';
import Button from '../common/Button';
import YantraMotif from '../common/YantraMotif';
import useCountdown from '../../hooks/useCountdown';

// Import flanking images
import prod1 from '../../assets/images/product-1.jpeg';
import prod2 from '../../assets/images/product-2.jpeg';

export function OfferSection({ targetDate }) {
  // Stable date selection (stored in localStorage to prevent reset on re-render)
  const [finalTarget] = useState(() => {
    if (targetDate) return targetDate;
    
    try {
      const savedDate = localStorage.getItem('divya_gems_promo_target');
      if (savedDate) {
        if (new Date(savedDate) > new Date()) {
          return savedDate;
        }
      }
    } catch (e) {
      console.warn('LocalStorage is not accessible', e);
    }
    
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const newTarget = date.toISOString();
    
    try {
      localStorage.setItem('divya_gems_promo_target', newTarget);
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
    return newTarget;
  });

  const { days, hours, mins, secs, isExpired } = useCountdown(finalTarget);

  return (
    <section className="section bg-[#151112] text-text-inverse relative py-20 overflow-hidden">
      {/* Left Flanking Image (Floating 3D Showcase) */}
      <div className="absolute left-8 xl:left-16 top-1/2 -translate-y-1/2 w-52 h-64 hidden lg:block select-none pointer-events-none rounded-2xl overflow-hidden border border-secondary/25 shadow-2xl rotate-3 opacity-45 transition-transform duration-500 hover:rotate-1 z-0">
        <img src={prod1} alt="Bestseller Gemstone" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/35" />
      </div>

      {/* Right Flanking Image (Floating 3D Showcase) */}
      <div className="absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 w-52 h-64 hidden lg:block select-none pointer-events-none rounded-2xl overflow-hidden border border-secondary/25 shadow-2xl -rotate-3 opacity-45 transition-transform duration-500 hover:rotate-1 z-0">
        <img src={prod2} alt="Vedic Solitaire" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/10 to-black/35" />
      </div>

      {/* Yantra Motif Centered Watermark behind content */}
      <YantraMotif 
        className="opacity-10 text-secondary absolute inset-0 m-auto w-80 h-80 sm:w-96 sm:h-96 pointer-events-none z-0" 
      />

      {/* Centered Content Container */}
      <div className="container-app relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto px-6">
        <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-secondary-light font-extrabold">
          ✦ CELESTIAL PROMOTION ✦
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-inverse mt-4 mb-4 leading-tight">
          Vedic Solstice Solitaires
        </h2>
        <p className="text-text-inverse/85 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-sans">
          Blessed under the auspicious alignment of the Solar Solstice. Each celestial gemstone is hand-energized by Vedic pundits to maximize prosperity, clarity, and protection. Limited quantities available.
        </p>

        {/* Live Countdown Grid */}
        <div className="mb-10 select-none">
          {isExpired ? (
            <span className="font-mono text-secondary text-xl sm:text-2xl font-bold tracking-widest uppercase animate-fadeIn">
              Offer Ended
            </span>
          ) : (
            <div className="flex gap-3 sm:gap-4 justify-center">
              {/* Days */}
              <div className="flex flex-col items-center justify-center border border-secondary/25 rounded-2xl w-20 h-20 sm:w-24 sm:h-24 bg-white/[0.03] backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-300 hover:border-secondary/40 hover:bg-white/[0.05]">
                <span className="font-mono text-secondary-light text-2xl sm:text-3xl font-extrabold leading-none tracking-tight">
                  {String(days).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-text-inverse/60 mt-2 uppercase font-semibold">
                  Days
                </span>
              </div>

              {/* Hours */}
              <div className="flex flex-col items-center justify-center border border-secondary/25 rounded-2xl w-20 h-20 sm:w-24 sm:h-24 bg-white/[0.03] backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-300 hover:border-secondary/40 hover:bg-white/[0.05]">
                <span className="font-mono text-secondary-light text-2xl sm:text-3xl font-extrabold leading-none tracking-tight">
                  {String(hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-text-inverse/60 mt-2 uppercase font-semibold">
                  Hours
                </span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center justify-center border border-secondary/25 rounded-2xl w-20 h-20 sm:w-24 sm:h-24 bg-white/[0.03] backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-300 hover:border-secondary/40 hover:bg-white/[0.05]">
                <span className="font-mono text-secondary-light text-2xl sm:text-3xl font-extrabold leading-none tracking-tight">
                  {String(mins).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-text-inverse/60 mt-2 uppercase font-semibold">
                  Mins
                </span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center justify-center border border-secondary/25 rounded-2xl w-20 h-20 sm:w-24 sm:h-24 bg-white/[0.03] backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-300 hover:border-secondary/40 hover:bg-white/[0.05]">
                <span className="font-mono text-secondary-light text-2xl sm:text-3xl font-extrabold leading-none tracking-tight">
                  {String(secs).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-text-inverse/60 mt-2 uppercase font-semibold">
                  Secs
                </span>
              </div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Button 
          variant="secondary" 
          as="Link" 
          to="/products" 
          disabled={isExpired}
          className="bg-gradient-to-r from-secondary via-secondary-light to-secondary text-primary font-bold shadow-lg shadow-secondary/15 hover:shadow-secondary/35 transition-all duration-300 hover:scale-105 min-w-[220px] rounded-full py-3.5"
        >
          Claim Offer Now
        </Button>
      </div>
    </section>
  );
}

export default OfferSection;
