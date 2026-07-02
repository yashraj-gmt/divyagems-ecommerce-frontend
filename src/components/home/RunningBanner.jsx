import React from 'react';

export function RunningBanner() {
  const message = "Free Delivery from Rs5999";
  // Render 12 items per group to ensure it exceeds typical wide screens
  const items = Array(12).fill(message);

  return (
    <div className="marquee-container overflow-hidden bg-[#8F5F2F] py-2.5 border-y border-secondary/10 relative select-none z-10">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {/* Group 1 */}
        <div className="flex items-center shrink-0">
          {items.map((item, idx) => (
            <div key={`g1-${idx}`} className="flex items-center">
              <span className="font-sans text-xs font-bold text-text-inverse tracking-widest uppercase mx-8">
                {item}
              </span>
              <span className="w-2 h-2 rounded-full border-2 border-text-inverse/40 shrink-0" />
            </div>
          ))}
        </div>
        {/* Group 2 (Duplicate for seamless reset) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {items.map((item, idx) => (
            <div key={`g2-${idx}`} className="flex items-center">
              <span className="font-sans text-xs font-bold text-text-inverse tracking-widest uppercase mx-8">
                {item}
              </span>
              <span className="w-2 h-2 rounded-full border-2 border-text-inverse/40 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RunningBanner;
