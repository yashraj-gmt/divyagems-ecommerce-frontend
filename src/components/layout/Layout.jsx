import React from 'react';
import Header from './Header';
import Footer from './Footer';

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
