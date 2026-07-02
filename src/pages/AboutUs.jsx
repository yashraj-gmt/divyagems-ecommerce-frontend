import React from 'react';
import SeoHead from '../components/seo/SeoHead';
import SectionHeading from '../components/common/SectionHeading';
import YantraMotif from '../components/common/YantraMotif';
import WhyChooseUs, { Icons } from '../components/home/WhyChooseUs';

export function AboutUs() {
  // Offerings list
  const offerings = [
    'Natural & Certified Gemstones',
    'Shree Yantras & Spiritual Yantras',
    'Vastu Products & Remedies',
    'Crystal Healing Products',
    'Rudraksha & Spiritual Accessories',
    'Feng Shui Remedies',
    'Reiki & Energy Healing Products',
    'Astrology Consultation',
    'Tarot Reading',
    'Residential Vastu Consultation',
    'Commercial & Industrial Vastu Solutions'
  ];

  // Custom 7 items for WhyChooseUs
  const customChooseItems = [
    {
      icon: Icons.Experience,
      title: '23+ Years of Experience',
      desc: 'Serving clients globally since 2001 with trusted astrological and Vastu guidance.'
    },
    {
      icon: Icons.Clients,
      title: '10,000+ Happy Clients',
      desc: 'Patrons worldwide trust our customized remedies for alignment and prosperity.'
    },
    {
      icon: Icons.Authentic,
      title: 'Authentic & Quality-Assured Products',
      desc: '100% natural, untreated, government-approved lab-certified crystals and gemstones.'
    },
    {
      icon: Icons.Guidance,
      title: 'Personalized Guidance & Consultation',
      desc: 'Astrological recommendations tailored to your unique planetary charts and needs.'
    },
    {
      icon: Icons.Vastu,
      title: 'Trusted Vastu & Astrology Solutions',
      desc: 'Practical, non-demolition space balancing based on ancient Vastu Siddhant.'
    },
    {
      icon: Icons.Service,
      title: 'Pan-India & International Service',
      desc: 'Insured worldwide shipping with transparent tracking for clients across the globe.'
    },
    {
      icon: Icons.Ethical,
      title: 'Ethical & Customer-Focused Approach',
      desc: 'Earning lifelong customer trust through transparency, confidentiality, and integrity.'
    }
  ];

  return (
    <div className="min-h-screen bg-bg">
      <SeoHead 
        title="About Us | Divya Gems" 
        description="Learn about Divya Gems, founded by Bharatbhai Khandhedia, offering authentic Vastu solutions, astrology guidance, gemstones, and spiritual remedies since 2001." 
      />

      {/* ── SECTION 1: HERO (bg-[#151112]) ── */}
      <section className="relative overflow-hidden bg-[#151112] text-text-inverse py-20 border-b border-border">
        {/* Subtle Yantra watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <svg className="w-96 h-96 text-secondary" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M7.5 7.5l9 9M7.5 16.5l9-9" />
          </svg>
        </div>

        <div className="container-app relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <span className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-secondary font-bold">ESTABLISHED 2001</span>
          
          <h1 className="font-display text-text-inverse text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Bringing Positivity, Prosperity &amp; Spiritual Harmony
          </h1>
          
          <div className="w-[80px] h-[3px] bg-secondary mx-auto" />
          
          <p className="text-text-inverse/85 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-sans">
            Guiding individuals and spaces toward energetic alignment, planetary harmony, and sustainable wellness for over two decades.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: COMPANY OVERVIEW & STAT COUNTERS ── */}
      <section className="section bg-bg border-b border-border">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left: Bio info */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="font-mono text-xs tracking-widest uppercase text-secondary font-bold">✦ WHO WE ARE ✦</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary">Our Journey & Philosophy</h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-sans">
                At Divya Gems, we believe that every individual deserves to live a life filled with
                positive energy, balance, and success. Founded by Bharatbhai Khandhedia, Divya Gems
                has been dedicated to helping people transform their lives through authentic Vastu
                solutions, astrology guidance, gemstones, spiritual remedies, and energy-balancing
                products.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed font-sans">
                For more than two decades, we have served thousands of satisfied clients
                across India and abroad, offering trusted consultations and carefully selected
                products that align with traditional Indian wisdom and modern-day needs.
              </p>
            </div>

            {/* Right: Stat counter highlights */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-border/80 shadow-xs flex flex-col justify-center text-center">
                <span className="font-mono text-3xl font-extrabold text-secondary-dark block">23+</span>
                <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider mt-1 block">Years Experience</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-border/80 shadow-xs flex flex-col justify-center text-center">
                <span className="font-mono text-3xl font-extrabold text-secondary-dark block">10K+</span>
                <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider mt-1 block">Happy Clients</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-border/80 shadow-xs flex flex-col justify-center text-center col-span-2">
                <span className="font-mono text-3xl font-extrabold text-secondary-dark block">100%</span>
                <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider mt-1 block">Natural &amp; Certified Crystals</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: MISSION & VISION CARDS ── */}
      <section className="section bg-bg-section border-b border-border">
        <div className="container-app">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="bg-white p-8 rounded-2xl border border-border/70 shadow-xs flex items-start gap-5 hover:border-secondary hover:shadow-md transition-all duration-300 text-left">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21V2.25m0 18.75a9.002 9.002 0 0 0 5-16.747m-5 16.747a9.002 9.002 0 0 1-5-16.747M12 2.25a9.002 9.002 0 0 1 5 3.253m-5-3.253a9.002 9.002 0 0 0-5 3.253zm0 0v18.75" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-primary text-xl font-bold">Our Mission</h3>
                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  To make authentic spiritual and Vastu solutions accessible to everyone. We strive to help individuals, families, and businesses create harmonious environments that support health, prosperity, happiness, and personal growth.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 rounded-2xl border border-border/70 shadow-xs flex items-start gap-5 hover:border-secondary hover:shadow-md transition-all duration-300 text-left">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-primary text-xl font-bold">Our Vision</h3>
                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  To become a global beacon of trust for Vedic lifestyle guidance, creating environments where people live in synchronization with universal cosmic energies and reach their highest life potential.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: CORE VALUES ── */}
      <section className="section bg-bg border-b border-border">
        <div className="container-app">
          <div className="mb-10 text-center flex flex-col items-center">
            <SectionHeading eyebrow="OUR PILLARS" title="Core Values" align="center" />
            <p className="text-text-muted text-sm max-w-md mt-2 font-sans">
              The fundamental standards that drive our consultations and curation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Value 1: Authenticity */}
            <div className="bg-white p-6 rounded-2xl border border-border/60 shadow-xs text-center space-y-3 hover:border-secondary hover:shadow-sm transition-all duration-200">
              <div className="w-10 h-10 rounded-full bg-secondary-light/10 text-secondary flex items-center justify-center mx-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h4 className="font-display text-primary font-bold text-base">Authenticity</h4>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Providing 100% natural, untreated, government lab-certified gems and crystals.
              </p>
            </div>

            {/* Value 2: Jyotish Tradition */}
            <div className="bg-white p-6 rounded-2xl border border-border/60 shadow-xs text-center space-y-3 hover:border-secondary hover:shadow-sm transition-all duration-200">
              <div className="w-10 h-10 rounded-full bg-secondary-light/10 text-secondary flex items-center justify-center mx-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <h4 className="font-display text-primary font-bold text-base">Vedic Wisdom</h4>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Upholding traditional Siddhants from scriptures for Vastu and Astrology matching.
              </p>
            </div>

            {/* Value 3: Ethical Integrity */}
            <div className="bg-white p-6 rounded-2xl border border-border/60 shadow-xs text-center space-y-3 hover:border-secondary hover:shadow-sm transition-all duration-200">
              <div className="w-10 h-10 rounded-full bg-secondary-light/10 text-secondary flex items-center justify-center mx-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12Z" />
                </svg>
              </div>
              <h4 className="font-display text-primary font-bold text-base">Ethical Integrity</h4>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Transparent and honest recommendations, avoiding unscientific scares or panic.
              </p>
            </div>

            {/* Value 4: Client Growth */}
            <div className="bg-white p-6 rounded-2xl border border-border/60 shadow-xs text-center space-y-3 hover:border-secondary hover:shadow-sm transition-all duration-200">
              <div className="w-10 h-10 rounded-full bg-secondary-light/10 text-secondary flex items-center justify-center mx-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                </svg>
              </div>
              <h4 className="font-display text-primary font-bold text-base">Client Curation</h4>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Prioritizing personalized consultation to suggest custom, budget-friendly remedies.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: MEET OUR FOUNDER (bg-bg-section) ── */}
      <section className="section bg-bg-section border-b border-border">
        <div className="container-app">
          <div className="mb-10 text-center flex flex-col items-center">
            <SectionHeading eyebrow="THE VISIONARY" title="Meet Our Founder" align="center" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left: Portrait image */}
            <div className="lg:col-span-5 relative max-w-sm mx-auto w-full px-4 sm:px-0">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border bg-bg shadow-card relative z-0">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80" 
                  alt="Bharatbhai Khandhedia" 
                  className="w-full h-full object-cover" 
                  draggable={false}
                />
              </div>

              {/* Overlapping stats card */}
              <div className="absolute -bottom-4 -right-1 sm:-right-4 border-2 border-secondary bg-white rounded-2xl shadow-md py-3.5 px-5 flex items-center gap-2.5 transition-transform duration-300 hover:scale-105 select-none z-10">
                <span className="font-display text-lg font-bold text-primary leading-none">23+ Years</span>
                <span className="text-[10px] text-text-secondary font-sans font-semibold tracking-wide uppercase leading-none border-l border-border pl-2.5">
                  of Trusted Guidance
                </span>
              </div>
            </div>

            {/* Right: Founder detailed biography copy */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left mt-6 lg:mt-0">
              <div>
                <h3 className="font-display text-primary text-2xl font-bold leading-tight">
                  Bharatbhai Khandhedia
                </h3>
                <p className="text-secondary text-xs sm:text-sm font-semibold uppercase tracking-wider mt-1 leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans">
                  Vastu Siddhant Shastri | Vastu Consultant | Spiritual Advisor | Gemstone Expert
                </p>
              </div>

              <div className="space-y-4 text-text-muted text-sm leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans text-left">
                <p>
                  Bharatbhai Khandhedia is the visionary founder of Divya Gems and a respected
                  practitioner in the fields of Vastu Shastra, Astrology, Gem Therapy, and Spiritual
                  Healing. With over two decades of experience, he has dedicated his life to helping
                  individuals, families, and businesses create positive, harmonious, and prosperous
                  environments.
                </p>
                <p>
                  His journey began with a deep interest in ancient Indian sciences and spiritual
                  practices. Over the years, he has extensively studied Vastu Shastra, astrology,
                  energy balancing, gemstones, yantras, and spiritual remedies, combining traditional
                  wisdom with practical modern-day solutions.
                </p>
                <p>
                  Through Divya Gems, Bharatbhai has guided thousands of clients across India and
                  internationally, helping them address challenges related to health, relationships,
                  business growth, finances, career advancement, and overall well-being. His
                  personalized approach and commitment to ethical guidance have earned him the trust
                  and respect of a diverse clientele.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 6: WHY CHOOSE DIVYA GEMS ── */}
      <WhyChooseUs items={customChooseItems} bgClassName="bg-bg border-b border-border" />

      {/* ── SECTION 7: SCANNABLE OFFERINGS GRID ── */}
      <section className="section bg-bg-section border-b border-border">
        <div className="container-app">
          <div className="mb-10 text-center flex flex-col items-center">
            <SectionHeading eyebrow="OUR PORTFOLIO" title="Spiritual Offerings Portfolio" align="center" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {offerings.map((item, index) => (
              <div 
                key={index} 
                className="bg-white border border-border/80 rounded-2xl p-4 flex items-center gap-3.5 hover:shadow-sm hover:border-secondary transition-all duration-200 cursor-default select-none group"
              >
                <div className="p-1.5 rounded-full bg-bg border border-border group-hover:bg-secondary/5 group-hover:border-secondary transition-all">
                  <YantraMotif className="w-5 h-5 text-secondary transition-colors" strokeWidth={1.5} />
                </div>
                <span className="font-sans font-semibold text-primary text-[11px] sm:text-xs tracking-wider uppercase leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
