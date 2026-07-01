import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';

export function Disclaimer() {
  const sectionsData = [
    {
      id: 'disclaimer-content',
      heading: '', // Omitted to avoid rendering a section heading for this short page
      content: (
        <div className="bg-bg-section border border-border rounded-card p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start shadow-sm font-sans my-2">
          {/* Warn/Alert Icon */}
          <div className="p-2.5 bg-white rounded-full text-secondary shrink-0 shadow-inner">
            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          {/* Paragraphs */}
          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-text-primary">
            <p>
              All products sold on DivyaGems, including gemstones, Rudraksha, and astrology-related
              items, are offered for spiritual, healing, and decorative purposes.
            </p>
            <p>
              We do not guarantee specific outcomes or results from using any product. The
              effectiveness of gemstones or astrological items is based on belief systems and varies
              from person to person.
            </p>
            <p>
              Customers are advised to consult certified professionals (e.g., astrologers,
              gemologists) before making purchases for spiritual or astrological purposes.
            </p>
            <p>
              By using our website, you accept that DivyaGems is not responsible for any direct or
              indirect consequences of your reliance on the information or products.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <LegalPageLayout
      title="Disclaimer"
      lastUpdated="June 10, 2025"
      sections={sectionsData}
      showToc={false} // Disable TOC sidebar since it is a brief page
    />
  );
}

export default Disclaimer;
