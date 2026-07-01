import React, { useState, useEffect, useRef } from 'react';
import Button from '../common/Button';

export function LegalPageLayout({ title, lastUpdated, sections = [], intro, showToc = true }) {
  const [activeId, setActiveId] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // IntersectionObserver to highlight current section in Table of Contents
  useEffect(() => {
    if (sections.length === 0 || !showToc) return;

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -60% 0px', // triggers when the section enters the reading viewport zone
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections, showToc]);

  // Click outside to close mobile dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140; // Offset for sticky navbar + TOC header bar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="bg-bg min-h-screen py-12 font-sans text-text-primary">
      <div className="container-app max-w-5xl">
        
        {/* ── HEADER ── */}
        <header className="mb-8 border-b border-border pb-6">
          <h1 className="font-display text-primary text-3xl md:text-4xl font-bold leading-tight">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-text-muted text-xs sm:text-sm mt-2 font-mono">
              Last Updated: {lastUpdated}
            </p>
          )}
        </header>

        {/* ── INTRO PARAGRAPH ── */}
        {intro && (
          <div className="mb-10 text-sm sm:text-base leading-relaxed text-text-muted max-w-3xl">
            {intro}
          </div>
        )}

        {/* ── MAIN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          
          {/* ── MOBILE JUMP DROPDOWN (<1024px) ── */}
          {showToc && (
            <div ref={dropdownRef} className="lg:hidden w-full relative z-20 mb-4">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between bg-white border border-border rounded-lg px-4 py-3 text-sm font-bold text-primary uppercase tracking-wider cursor-pointer shadow-sm focus:outline-none"
              >
                <span>Jump to section</span>
                <span className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fadeIn z-30">
                  {sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => handleScrollTo(sec.id)}
                      className="w-full text-left px-4 py-3 text-xs sm:text-sm text-text-primary hover:bg-bg hover:text-secondary-dark transition-colors font-medium border-b border-border/40 last:border-none cursor-pointer"
                    >
                      {sec.heading}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── DESKTOP STICKY TABLE OF CONTENTS (≥1024px) ── */}
          {showToc && (
            <aside className="hidden lg:block lg:col-span-4 sticky top-[140px] z-10 pr-4">
              <h2 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-border pb-3 mb-4 font-mono">
                Table of Contents
              </h2>
              <nav className="space-y-3">
                {sections.map((sec) => {
                  const isActive = activeId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleScrollTo(sec.id)}
                      className={`block text-left text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer pl-2 border-l-2 ${
                        isActive 
                          ? 'text-secondary-dark border-secondary font-bold translate-x-1' 
                          : 'text-text-muted border-transparent hover:text-primary hover:border-border'
                      }`}
                    >
                      {sec.heading}
                    </button>
                  );
                })}
              </nav>
            </aside>
          )}

          {/* ── CONTENT AREA ── */}
          <main className={`${showToc ? 'lg:col-span-8' : 'lg:col-span-12 max-w-prose mx-auto w-full'} space-y-12`}>
            {sections.map((sec) => {
              const isSpecial = sec.isSpecial;
              return (
                <article
                  key={sec.id}
                  id={sec.id}
                  className="legal-section space-y-4 scroll-mt-24"
                >
                  {/* Section Heading with Accent Bar */}
                  {sec.heading && (
                    <div className="flex items-center gap-3">
                      <div 
                        className={`shrink-0 bg-accent-emerald rounded-full transition-all ${
                          isSpecial ? 'w-2 h-7' : 'w-1 h-6'
                        }`}
                      />
                      <h3 className="font-display text-primary text-lg sm:text-xl font-bold flex items-center gap-2">
                        {sec.heading}
                        {isSpecial && (
                          <span className="inline-flex items-center bg-accent-emerald/10 text-accent-emerald text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Confidential
                          </span>
                        )}
                      </h3>
                    </div>
                  )}
                  
                  {/* Section Content */}
                  <div className="text-sm sm:text-[15px] leading-relaxed text-text-primary space-y-3 font-sans">
                    {sec.content}
                  </div>
                </article>
              );
            })}

            {/* ── QUESTIONS / FOOTER CARD ── */}
            <div className="bg-bg-section border border-border/80 rounded-card p-6 sm:p-7 space-y-4 mt-16 shadow-inner">
              <h4 className="font-display text-primary text-base sm:text-lg font-bold">
                Questions about this policy?
              </h4>
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                If you require clarification on any clause or wish to inquire about how we handle user information, please contact our support team.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 pt-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                    <span className="text-secondary select-none">📧</span>
                    <a href="mailto:info@divyagems.in" className="text-primary hover:text-secondary transition-colors">
                      info@divyagems.in
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                    <span className="text-secondary select-none">📞</span>
                    <a href="tel:9206970970" className="text-primary hover:text-secondary font-mono transition-colors">
                      +91 92069 70970
                    </a>
                  </div>
                </div>
                
                <Button 
                  as="Link"
                  to="/contact"
                  variant="outline"
                  className="text-xs uppercase tracking-wider font-bold shrink-0 min-h-[44px]"
                >
                  Contact Support
                </Button>
              </div>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}

export default LegalPageLayout;
