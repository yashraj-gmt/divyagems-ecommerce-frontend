import React from 'react';
import HeroCarousel from '../components/home/HeroCarousel';
import ShopByCategory from '../components/home/ShopByCategory';
import BestSellers from '../components/home/BestSellers';
import OfferSection from '../components/home/OfferSection';
import TrendingNow from '../components/home/TrendingNow';
import AboutOverview from '../components/home/AboutOverview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import ContactTeaser from '../components/home/ContactTeaser';

export function Home() {
  return (
    <div className="bg-bg min-h-screen space-y-0">
      <HeroCarousel />
      <ShopByCategory />
      <BestSellers />
      <OfferSection />
      <TrendingNow />
      <AboutOverview />
      <WhyChooseUs />
      <Testimonials />
      <ContactTeaser />
    </div>
  );
}

export default Home;
