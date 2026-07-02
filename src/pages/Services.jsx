import React from 'react';
import SeoHead from '../components/seo/SeoHead';
import SectionHeading from '../components/common/SectionHeading';
import ServiceCard from '../components/services/ServiceCard';
import FAQ from '../components/common/FAQ';

export function Services() {
  const tabs = [
    { id: 'astrology', label: 'Astrology Services' },
    { id: 'vastu', label: 'Vaastu Solutions' },
    { id: 'healing', label: 'Healing Services' }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBookingClick = (title) => {
    const phoneNumber = "919824645978"; // Bharatbhai Khandhedia
    const message = encodeURIComponent(`Hello, I would like to inquire about booking the service: "${title}" at Divya Gems.`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // 1. Astrology Services List
  const astrologyServices = [
    {
      title: 'Horoscope Matching',
      price: 2499,
      description: "Evaluate matching parameters based on Ashtakoot Guna Milan to check longevity, health, and mutual compatibility.",
      features: [
        'Kundli matching based on Guna Milan',
        'Mangal dosha & Nadi compatibility analysis',
        'Report covering marriage, health & longevity',
        'Expert guidance for relationship harmony'
      ],
      ctaLabel: 'Get Reading'
    },
    {
      title: 'Birth Kundli (Natal Chart)',
      price: 2100,
      description: "Complete diagnostic mapping of planets, houses, and aspects in your natal chart, suggesting remedies for career and relationships.",
      features: [
        'Complete chart of astrological birth positions',
        'Houses, planets & their astrological effects',
        'Life predictions across career & relationships',
        'Personalized remedies & gemstone suggestions'
      ],
      ctaLabel: 'Create Chart'
    },
    {
      title: 'Gemstone Recommendation',
      price: 1100,
      description: "In-depth chart analysis to identify your life-supporting Jyotish gemstone, along with precise weight, metal, and activation procedures.",
      features: [
        'Comprehensive analysis of planetary strengths',
        'Suitable gemstones based on your birth chart',
        'Authenticity guidance (weight, carat & metal)',
        'Complete energization & activation rituals'
      ],
      ctaLabel: 'Find Your Stone'
    },
    {
      title: 'Business Report',
      price: 2100,
      description: "Identify auspicious venture launch timings, partner compatibility profiles, and potential sectors for stable growth.",
      features: [
        'Auspicious timing for launching new ventures',
        'Astrological compatibility with partners',
        'Favorable industries based on planetary lines',
        'Financial growth opportunities & risk analysis'
      ],
      ctaLabel: 'Business Insights'
    },
    {
      title: 'Career Report',
      price: 2100,
      description: "Map astrological career alignments to target suitable domains and maximize growth during favorable Dasha periods.",
      features: [
        'Ideal career paths aligned to your horoscope',
        'In-depth job suitability vs business analysis',
        'Favorable planetary periods for growth',
        'Practical astrological career remedies'
      ],
      ctaLabel: 'Career Guidance'
    },
    {
      title: 'Health Report',
      price: 2100,
      description: "Pre-emptive diagnostic analysis of planetary positions influencing physical vitality and spiritual well-being.",
      features: [
        'Holistic physical & mental health insights',
        'Critical analysis of weak houses & health doshas',
        'Predictions for health trends & prevention guides',
        'Spiritual & astrological wellness remedies'
      ],
      ctaLabel: 'Health Analysis'
    }
  ];

  // 2. Vaastu Solutions List
  const vastuServices = [
    {
      title: 'Residential & Commercial Consultation',
      price: 'Contact for Pricing',
      description: "On-site or blueprint direction analysis to align natural energy flows and boost prosperity without physical demolition.",
      features: [
        'In-depth Vaastu analysis of layout & property',
        'Exact energy zone calculations & corrections',
        'Practical solutions for wealth & relationships',
        'Non-demolition, non-invasive balance remedies'
      ],
      ctaLabel: 'Schedule Consultation'
    },
    {
      title: 'Site Selection & Layout Analysis',
      price: 'Contact for Pricing',
      description: "Directional, soil, and slope assessment of new plots to ensure positive foundations before commencing structural layouts.",
      features: [
        'Plot shape, slope, and soil evaluation',
        'Directional analysis for doors & entryways',
        'Auspicious room placement planning',
        'Blueprint mapping according to Vaastu Shastra'
      ],
      ctaLabel: 'Analyze Site'
    },
    {
      title: 'Vaastu Remedies',
      price: 'Contact for Pricing',
      description: "Personalized remedial placements involving copper pyramids, Yantras, metal strips, and gemstone crystal grids.",
      features: [
        'Provisioning of energized Yantras & Pyramids',
        'Directional color & elemental alignment therapy',
        'Customized crystal placements & brass cures',
        'Easy remedies without major renovation costs'
      ],
      ctaLabel: 'Get Remedies'
    }
  ];

  // 3. Healing Services List
  const healingServices = [
    {
      title: 'Tarot Card Reading',
      price: 1500,
      description: "Intuitive symbolic spreads offering spiritual guidance and direct answers to clarify relationships, paths, or career questions.",
      features: [
        'Intuitive reading by experienced practitioners',
        'Focused spreads for love, career & finances',
        'Absolute clarity on decisions & future paths',
        'Online virtual sessions (video call or phone)'
      ],
      ctaLabel: 'Book Reading'
    },
    {
      title: 'Reiki Healing',
      price: 1500,
      description: "Distant or in-person channelled energy sessions focused on clearing aura blockages, balancing chakras, and reducing stress.",
      features: [
        'Personalized aura cleansing & healing sessions',
        'Holistic chakra balancing & stress reduction',
        'Gentle release of deep emotional blockages',
        'Distance healing or in-person sessions'
      ],
      ctaLabel: 'Heal Now'
    },
    {
      title: 'Meditation Guidance',
      price: 1000,
      description: "Custom guided practices incorporating breathwork, chakra-focus, and cosmic visualizations for inner stillness.",
      features: [
        'Guided one-on-one meditation sessions',
        'Effective breathwork & visualization methods',
        'Chakra-focused healing meditation routines',
        'Beginner to advanced custom instructions'
      ],
      ctaLabel: 'Start Meditating'
    }
  ];

  // Service FAQs list
  const servicesFaqs = [
    {
      question: "What details are required for a Birth Kundli session?",
      answer: "You will need to provide your exact date of birth, time of birth (with AM/PM precision), and your location/city of birth for an accurate astrological calculation."
    },
    {
      question: "How long does a Vastu consultation take?",
      answer: "An initial Vastu consultation takes about 1-2 hours depending on the property size. We analyze energy flows, layout patterns, and draft remedial recommendations."
    },
    {
      question: "Do you offer online consultation sessions?",
      answer: "Yes, all our services—including horoscope readings, gemstone selection, and vastu mapping—are available online via secure video conferences."
    },
    {
      question: "How do gemstone recommendations work?",
      answer: "Bharatbhai Khandhedia analyzes your birth chart planetary alignments, current dasha cycles, and life obstacles to prescribe the most supportive natural gemstone."
    }
  ];

  return (
    <div className="min-h-screen bg-bg">
      <SeoHead 
        title="Astrology, Vaastu & Healing Services | Divya Gems" 
        description="Book professional consultations and healing sessions: Kundli Matching, Vaastu Consultations, Gemstone Recommendations, Tarot Reading, and Reiki Healing." 
      />

      {/* ── SECTION 1: HERO (bg-bg-dark) ── */}
      <section className="section bg-[#151112] text-text-inverse relative py-20 overflow-hidden border-b border-border">
        {/* Subtle Yantra Motif watermark background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <svg className="w-96 h-96 text-secondary" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M7.5 7.5l9 9M7.5 16.5l9-9" />
          </svg>
        </div>

        <div className="container-app relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <span className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-secondary font-bold">ASTROLOGY &amp; HEALING SERVICES</span>
          
          <h1 className="font-display text-text-inverse text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Accurate, Personalized &amp; Soul-Aligned Guidance
          </h1>
          
          <div className="w-[80px] h-[3px] bg-secondary mx-auto" />
          
          <p className="text-text-inverse/85 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-sans">
            Our expert services combine ancient wisdom with intuitive insight to help you make
            informed decisions, improve well-being, and align your life with your soul's
            purpose.
          </p>
        </div>
      </section>

      {/* ── STICKY NAVIGATION TABS ── */}
      <div className="sticky top-[72px] md:top-[80px] z-30 bg-white/95 backdrop-blur-xs border-b border-border shadow-sm py-4">
        <div className="container-app flex justify-center gap-3 sm:gap-6 md:gap-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className="font-sans font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-text-muted hover:text-primary transition-all cursor-pointer pb-1.5 border-b-2 border-transparent hover:border-secondary"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: ASTROLOGY SERVICES (bg-bg) ── */}
      <section id="astrology" className="section bg-bg border-b border-border">
        <div className="container-app">
          <div className="mb-10 text-center flex flex-col items-center">
            <SectionHeading eyebrow="ASTROLOGY SERVICES" title="Discover Your Cosmic Blueprint" align="center" />
            <p className="text-text-muted text-sm max-w-md mt-2 font-sans">
              Navigate life's journey with celestial guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {astrologyServices.map((srv, idx) => (
              <ServiceCard
                key={idx}
                title={srv.title}
                price={srv.price}
                description={srv.description}
                features={srv.features}
                ctaLabel={srv.ctaLabel}
                onCtaClick={() => handleBookingClick(srv.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: VAASTU SOLUTIONS (bg-bg-section) ── */}
      <section id="vastu" className="section bg-bg-section border-b border-border">
        <div className="container-app">
          <div className="mb-10 text-center flex flex-col items-center">
            <SectionHeading eyebrow="VAASTU SOLUTIONS" title="Balance Your Space" align="center" />
            <p className="text-text-muted text-sm max-w-md mt-2 font-sans">
              Balance energy for harmony and growth in your living and working spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {vastuServices.map((srv, idx) => (
              <ServiceCard
                key={idx}
                title={srv.title}
                price={srv.price}
                description={srv.description}
                features={srv.features}
                ctaLabel={srv.ctaLabel}
                onCtaClick={() => handleBookingClick(srv.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: HEALING SERVICES (bg-bg) ── */}
      <section id="healing" className="section bg-bg border-b border-border">
        <div className="container-app">
          <div className="mb-10 text-center flex flex-col items-center">
            <SectionHeading eyebrow="HEALING SERVICES" title="Heal From Within" align="center" />
            <p className="text-text-muted text-sm max-w-md mt-2 font-sans">
              Balance your energy and heal from within with our spiritual practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {healingServices.map((srv, idx) => (
              <ServiceCard
                key={idx}
                title={srv.title}
                price={srv.price}
                description={srv.description}
                features={srv.features}
                ctaLabel={srv.ctaLabel}
                onCtaClick={() => handleBookingClick(srv.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: SERVICES FAQS (bg-bg-section) ── */}
      <section className="section bg-bg-section">
        <div className="container-app">
          <FAQ faqs={servicesFaqs} eyebrow="CONSULTATION HELP" title="Frequently Asked Questions" />
        </div>
      </section>
    </div>
  );
}

export default Services;
