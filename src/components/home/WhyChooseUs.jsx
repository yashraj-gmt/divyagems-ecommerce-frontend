import React from 'react';
import SectionHeading from '../common/SectionHeading';

// Custom Sacred Geometry & Gemstone Line-Art Icons for a distinct premium feel (smaller size)
export const Icons = {
  Experience: () => (
    <svg className="w-8 h-8 text-secondary transition-colors duration-300 group-hover:text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
      <circle cx="12" cy="12" r="5" />
      <path strokeLinecap="round" d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" />
    </svg>
  ),
  Clients: () => (
    <svg className="w-8 h-8 text-secondary transition-colors duration-300 group-hover:text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 00-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0012 2z" />
      <path d="M12 6a6 6 0 00-6 6c0 3.314 2.686 6 6 6s6-2.686 6-6a6 6 0 00-6-6z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Authentic: () => (
    <svg className="w-8 h-8 text-secondary transition-colors duration-300 group-hover:text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L4 9l8 13 8-13-8-7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 9h16M12 2v20M4 9l8 5 8-5" />
    </svg>
  ),
  Guidance: () => (
    <svg className="w-8 h-8 text-secondary transition-colors duration-300 group-hover:text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
      <rect x="6" y="6" width="12" height="12" strokeWidth="1" strokeDasharray="2 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5L7.5 12l4.5 4.5 4.5-4.5L12 7.5z" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  Service: () => (
    <svg className="w-8 h-8 text-secondary transition-colors duration-300 group-hover:text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 00-4 9c0 3.3 1.5 7 4 9m0-18a9 9 0 014 9c0 3.3-1.5 7-4 9" />
      <path strokeLinecap="round" d="M3.5 9h17M3.5 15h17" />
    </svg>
  ),
  Ethical: () => (
    <svg className="w-8 h-8 text-secondary transition-colors duration-300 group-hover:text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4-5-8.5-2-11 2-2 3.5 1.5 2 3.5-1.5-2 0-5.5 2-3.5 3 2.5 2 7-2 11z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4-4 5-8.5 2-11-2-2-3.5 1.5-2 3.5m0 0C9.5 9 12 5 12 5s2.5 4 0 8.5z" />
    </svg>
  ),
  Vastu: () => (
    <svg className="w-8 h-8 text-secondary transition-colors duration-300 group-hover:text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M12 4v16" />
      <circle cx="12" cy="12" r="4" strokeDasharray="2 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.5L9.5 12l2.5 2.5 2.5-2.5L12 9.5z" />
    </svg>
  )
};

const chooseUsItems = [
  {
    icon: Icons.Experience,
    title: '23+ Years Experience',
    desc: 'Serving clients globally since 2001 with verified astrological and vastu guidance.'
  },
  {
    icon: Icons.Clients,
    title: '10,000+ Happy Clients',
    desc: 'Patrons worldwide trust our tailored gemstones for absolute harmony.'
  },
  {
    icon: Icons.Authentic,
    title: 'Authentic & Quality-Assured',
    desc: '100% natural, untreated, lab-certified crystals and gemstones.'
  },
  {
    icon: Icons.Guidance,
    title: 'Personalized Guidance',
    desc: 'Astrological prescriptions matched exactly to your zodiac alignments.'
  },
  {
    icon: Icons.Service,
    title: 'Pan-India & International Service',
    desc: 'Free insured worldwide shipping with premium tamper-proof packages.'
  },
  {
    icon: Icons.Ethical,
    title: 'Ethical & Customer-Focused',
    desc: 'Earning lifelong patron trust via transparent pricing and clear policies.'
  }
];

export function WhyChooseUs({ items, bgClassName }) {
  const displayItems = items || chooseUsItems;
  return (
    <section className={`section py-12 md:py-16 ${bgClassName || 'bg-bg-section'}`}>
      <div className="container-app">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-10">
          <SectionHeading eyebrow="WHY DIVYA GEMS" title="Why Choose Us" align="center" />
        </div>

        {/* Feature Grid with Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {displayItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="group flex flex-col items-center text-center space-y-4 max-w-sm mx-auto p-6 sm:p-8 bg-transparent border border-transparent rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-hover hover:-translate-y-1 cursor-default select-none"
              >
                {/* Icon wrapper */}
                <div className="p-3 bg-white rounded-full shadow-inner border border-border/80 flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:border-secondary group-hover:bg-secondary/5">
                  <Icon />
                </div>
                
                {/* Text Block */}
                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-primary text-base md:text-lg transition-colors duration-300 group-hover:text-secondary-dark">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed transition-colors duration-300 group-hover:text-text-secondary">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
