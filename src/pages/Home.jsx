import React from 'react';
import HeroCarousel from '../components/home/HeroCarousel';
import RunningBanner from '../components/home/RunningBanner';
import ShopByCategory from '../components/home/ShopByCategory';
import BestSellers from '../components/home/BestSellers';
import OfferSection from '../components/home/OfferSection';
import TrendingNow from '../components/home/TrendingNow';
import AboutOverview from '../components/home/AboutOverview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/common/FAQ';

export function Home() {
  const homeFaqs = [
    {
      question: "What makes Divya Gems' products unique?",
      answer: "All our gemstones are natural, ethically sourced, untreated, and 100% lab certified. They are selected by hand and energized under sacred Vedic guidance."
    },
    {
      question: "How do I choose the correct gemstone or service?",
      answer: "You can book a personal consultation with Bharatbhai Khandhedia to analyze your planetary positions or get in touch for custom recommendations."
    },
    {
      question: "Do you ship worldwide?",
      answer: "Yes, we ship across India and internationally. Orders above ₹5,999 qualify for free shipping within India. All orders are packed securely to protect energetic properties."
    },
    {
      question: "What is your return and exchange policy?",
      answer: "We offer a 7-day return and exchange policy on all products, provided they are in their original untreated, unworn condition with certification tags intact."
    }
  ];

  return (
    <div className="bg-bg min-h-screen space-y-0">
      <HeroCarousel />
      <RunningBanner />
      <ShopByCategory />
      <BestSellers />
      <OfferSection />
      <TrendingNow />
      <AboutOverview />
      <WhyChooseUs />
      <Testimonials />
      
      {/* ── SECTION 10: HOME FAQS ── */}
      <section className="section bg-white border-t border-border">
        <div className="container-app">
          <FAQ faqs={homeFaqs} eyebrow="CUSTOMER GUIDANCE" title="Frequently Asked Questions" />
        </div>
      </section>
    </div>
  );
}

export default Home;
