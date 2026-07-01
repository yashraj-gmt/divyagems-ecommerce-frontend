import React from 'react';
import Button from '../common/Button';
import YantraMotif from '../common/YantraMotif';
import useCountdown from '../../hooks/useCountdown';

// Import flanking images
import prod1 from '../../assets/images/product-1.jpeg';
import prod2 from '../../assets/images/product-2.jpeg';

export function OfferSection({ targetDate }) {
  // Default to 7 days from now if targetDate is not provided
  const getFutureDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString();
  };

  const finalTarget = targetDate || getFutureDate();
  const { days, hours, mins, secs, isExpired } = useCountdown(finalTarget);

  return (
    <section className="section bg-[#151112] text-text-inverse relative py-20 overflow-hidden">
      {/* Left Flanking Image with gradient fade to luxury dark background */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-80 hidden lg:block select-none pointer-events-none overflow-hidden opacity-30 z-0">
        <img src={prod1} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#151112]/50 to-[#151112]" />
      </div>

      {/* Right Flanking Image with gradient fade to luxury dark background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-80 hidden lg:block select-none pointer-events-none overflow-hidden opacity-30 z-0">
        <img src={prod2} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#151112]/50 to-[#151112]" />
      </div>

      {/* Yantra Motif Centered Watermark behind content */}
      <YantraMotif 
        className="opacity-10 text-secondary absolute inset-0 m-auto w-80 h-80 sm:w-96 sm:h-96 pointer-events-none z-0" 
      />

      {/* Centered Content Container */}
      <div className="container-app relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto px-6">
        <span className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-secondary font-bold">
          LIMITED COLLECTION
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-inverse mt-4 mb-4 leading-tight">
          Vedic Solstice Solitaires
        </h2>
        <p className="text-text-inverse/80 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
          Acquire hand-energized clear quartz points and premium amethyst geodes blessed under optimal astronomical configurations.
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
              <div className="flex flex-col items-center justify-center border border-secondary/40 rounded-lg w-16 h-16 sm:w-20 sm:h-20 bg-white/5 backdrop-blur-xs shadow-inner">
                <span className="font-mono text-secondary text-xl sm:text-2xl font-bold leading-none">
                  {String(days).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-text-inverse/70 mt-1 uppercase tracking-wider">
                  Days
                </span>
              </div>

              {/* Hours */}
              <div className="flex flex-col items-center justify-center border border-secondary/40 rounded-lg w-16 h-16 sm:w-20 sm:h-20 bg-white/5 backdrop-blur-xs shadow-inner">
                <span className="font-mono text-secondary text-xl sm:text-2xl font-bold leading-none">
                  {String(hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-text-inverse/70 mt-1 uppercase tracking-wider">
                  Hours
                </span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center justify-center border border-secondary/40 rounded-lg w-16 h-16 sm:w-20 sm:h-20 bg-white/5 backdrop-blur-xs shadow-inner">
                <span className="font-mono text-secondary text-xl sm:text-2xl font-bold leading-none">
                  {String(mins).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-text-inverse/70 mt-1 uppercase tracking-wider">
                  Mins
                </span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center justify-center border border-secondary/40 rounded-lg w-16 h-16 sm:w-20 sm:h-20 bg-white/5 backdrop-blur-xs shadow-inner">
                <span className="font-mono text-secondary text-xl sm:text-2xl font-bold leading-none">
                  {String(secs).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-text-inverse/70 mt-1 uppercase tracking-wider">
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
          className="shadow-lg min-w-[200px]"
        >
          Claim Offer
        </Button>
      </div>
    </section>
  );
}

export default OfferSection;
