import React from 'react';
import Button from '../common/Button';
import YantraMotif from '../common/YantraMotif';

export function ContactTeaser() {
  return (
    <section className="section bg-[#151112] text-text-inverse relative py-12 overflow-hidden">
      {/* Yantra Motif subtle background watermark */}
      <YantraMotif 
        className="opacity-10 text-secondary absolute inset-0 m-auto w-80 h-80 pointer-events-none z-0" 
      />

      <div className="container-app relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 text-center lg:text-left">
          
          {/* 3 Contact Data Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow max-w-4xl w-full">
            
            {/* Address */}
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <div className="flex items-center gap-2 text-secondary">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span className="font-sans font-semibold text-xs tracking-wider uppercase text-text-inverse/70 animate-pulse">
                  Our Showroom
                </span>
              </div>
              <span className="font-mono text-sm leading-relaxed text-text-inverse max-w-[240px]">
                Bhuyangdev BRTS Stand, Ahmedabad, India
              </span>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <div className="flex items-center gap-2 text-secondary">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622l.067-.02a2.25 2.25 0 0 1 2.25.356 2.25 2.25 0 0 1 .32 2.624l-.683 1.025a10.07 10.07 0 0 0 4.887 4.887l1.025-.683a2.25 2.25 0 0 1 2.624.32 2.25 2.25 0 0 1 .356 2.25l-.02.067a2.25 2.25 0 0 1-1.95 1.125 10.07 10.07 0 0 1-9.348-9.348 2.25 2.25 0 0 1 1.125-1.95z" />
                </svg>
                <span className="font-sans font-semibold text-xs tracking-wider uppercase text-text-inverse/70">
                  Call Astrologer
                </span>
              </div>
              <a 
                href="tel:9824645978" 
                className="font-mono text-sm text-text-inverse hover:text-secondary transition-colors duration-200"
              >
                +91 98246 45978
              </a>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <div className="flex items-center gap-2 text-secondary">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span className="font-sans font-semibold text-xs tracking-wider uppercase text-text-inverse/70">
                  Email Support
                </span>
              </div>
              <a 
                href="mailto:info@divyagems.in" 
                className="font-mono text-sm text-text-inverse hover:text-secondary transition-colors duration-200"
              >
                info@divyagems.in
              </a>
            </div>

          </div>

          {/* CTA Link Button */}
          <div className="shrink-0">
            <Button 
              variant="secondary" 
              as="Link" 
              to="/contact" 
              className="shadow-md min-w-[180px]"
            >
              Get in Touch
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactTeaser;
