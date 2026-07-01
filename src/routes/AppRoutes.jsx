import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import AllProducts from '../pages/AllProducts';
import ProductDetail from '../pages/ProductDetail';
import AboutUs from '../pages/AboutUs';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import Disclaimer from '../pages/Disclaimer';
import Cart from '../pages/Cart';
import TrackOrder from '../pages/TrackOrder';
import ShippingPolicy from '../pages/ShippingPolicy';
import ReturnPolicy from '../pages/ReturnPolicy';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsConditions from '../pages/TermsConditions';
import NotFound from '../pages/NotFound';

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default AppRoutes;
