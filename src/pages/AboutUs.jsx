import React from 'react';
import SeoHead from '../components/seo/SeoHead';
import SectionHeading from '../components/common/SectionHeading';
import YantraMotif from '../components/common/YantraMotif';
import WhyChooseUs, { Icons } from '../components/home/WhyChooseUs';
import ContactTeaser from '../components/home/ContactTeaser';

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

      {/* ── SECTION 1: HERO (bg-bg) ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-28 border-b border-border">
        {/* Main Content container */}
        <div className="container-app relative z-10">
          <div className="max-w-4xl space-y-6">
            <span className="section-eyebrow">ESTABLISHED 2001</span>
            
            <h1 className="font-display text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Bringing Positivity, Prosperity &amp; Spiritual Harmony Since 2001
            </h1>
            
            <div className="w-[80px] h-[3px] bg-secondary my-6" />
            
            <p className="text-text-muted text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-sans">
              At Divya Gems, we believe that every individual deserves to live a life filled with
              positive energy, balance, and success. Founded by Bharatbhai Khandhedia, Divya Gems
              has been dedicated to helping people transform their lives through authentic Vastu
              solutions, astrology guidance, gemstones, spiritual remedies, and energy-balancing
              products. For more than two decades, we have served thousands of satisfied clients
              across India and abroad, offering trusted consultations and carefully selected
              products that align with traditional Indian wisdom and modern-day needs.
            </p>
          </div>
        </div>

        {/* Yantra Motif Watermark Background */}
        <YantraMotif 
          className="opacity-5 text-secondary absolute -bottom-12 -right-12 w-72 h-72 sm:w-96 sm:h-96 pointer-events-none z-0" 
        />
      </section>

      {/* ── SECTION 2: OUR MISSION (bg-bg-section) ── */}
      <section className="section bg-bg-section border-b border-border">
        <div className="container-app text-center">
          <SectionHeading eyebrow="OUR PURPOSE" title="Our Mission" align="center" />
          
          <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl font-display italic text-primary leading-relaxed mt-8 px-4">
            &ldquo;Our mission is to make authentic spiritual and Vastu solutions accessible to
            everyone. We strive to help individuals, families, and businesses create harmonious
            environments that support health, prosperity, happiness, and personal growth.&rdquo;
          </p>
        </div>
      </section>

      {/* ── SECTION 3: WHAT WE OFFER (bg-bg) ── */}
      <section className="section bg-bg border-b border-border">
        <div className="container-app">
          <SectionHeading eyebrow="OUR OFFERINGS" title="What We Offer" align="center" />

          {/* Scannable Offerings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 mt-10">
            {offerings.map((item, index) => (
              <div 
                key={index} 
                className="bg-white border border-border/80 rounded-card p-4 flex items-center gap-3.5 hover:shadow-card hover:border-secondary transition-all duration-200 cursor-default select-none group"
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

      {/* ── SECTION 4: MEET OUR FOUNDER (bg-bg-section) ── */}
      <section className="section bg-bg-section border-b border-border">
        <div className="container-app">
          <SectionHeading eyebrow="THE VISIONARY" title="Meet Our Founder" align="center" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mt-10">
            
            {/* Left: Portrait image with overlapping stats badge */}
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
              <div className="absolute -bottom-4 -right-1 sm:-right-4 border-2 border-secondary bg-white rounded-card shadow-hover py-3.5 px-5 flex items-center gap-2.5 transition-transform duration-300 hover:scale-105 select-none z-10">
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
                <p className="text-secondary text-xs sm:text-sm font-semibold uppercase tracking-wider mt-1 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Vastu Siddhant Shastri | Vastu Consultant | Spiritual Advisor | Gemstone Expert
                </p>
              </div>

              <div className="space-y-4 text-text-muted text-sm leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
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
                  and respect of a diverse clientele. Bharatbhai believes that every space carries
                  energy and that proper alignment of this energy can significantly influence an
                  individual's success, happiness, and peace of mind. His consultations focus on
                  practical, non-demolition Vastu solutions, authentic gemstone recommendations, and
                  spiritual remedies tailored to each client's unique circumstances.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: WHY CHOOSE DIVYA GEMS (bg-bg) ── */}
      <WhyChooseUs items={customChooseItems} bgClassName="bg-bg border-b border-border" />

      {/* ── SECTION 6: OUR COMMITMENT (bg-bg-section) ── */}
      <section className="section bg-bg-section border-b border-border">
        <div className="container-app text-center">
          <SectionHeading eyebrow="OUR PLEDGE" title="Our Commitment" align="center" />
          
          <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-text-muted mt-6 font-sans">
            Every product offered by Divya Gems is selected with care and integrity. We focus
            on authenticity, quality, and customer satisfaction while maintaining the highest
            standards of professionalism and confidentiality. Whether you are seeking spiritual
            guidance, Vastu corrections, gemstone recommendations, or energy-enhancing products,
            our goal is to help you move closer to a more balanced, prosperous, and fulfilling
            life.
          </p>
        </div>
      </section>

      {/* ── SECTION 7: CONTACT TEASER (bg-dark band) ── */}
      <ContactTeaser />
    </div>
  );
}

export default AboutUs;
