import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/seo/SeoHead';
import YantraMotif from '../components/common/YantraMotif';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import CartItem from '../components/cart/CartItem';

export function TrackOrder() {
  // Mock Order Database
  const mockOrders = {
    'DG-10234': {
      id: 'DG-10234',
      email: 'rahul@example.com',
      phone: '9824645978',
      date: 'June 28, 2026',
      status: 'Shipped',
      courier: 'Delhivery',
      trackingNumber: 'DEL123456789',
      address: 'Rahul Verma, 45, Sterling Apartments, Vastrapur, Ahmedabad - 380015, Gujarat, India',
      timeline: [
        { title: 'Order Placed', time: 'Jun 28, 10:15 AM', reached: true },
        { title: 'Processing', time: 'Jun 28, 2:14 PM', reached: true },
        { title: 'Shipped', time: 'Jun 29, 9:30 AM', reached: true }, // Current stage
        { title: 'Out for Delivery', time: '', reached: false },
        { title: 'Delivered', time: '', reached: false }
      ],
      items: [
        {
          id: 1,
          name: 'Natural Ruby (Manik) - Astrological Grade',
          price: 12500,
          quantity: 1,
          category: 'Gemstone',
          stoneType: 'Ruby',
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
          selectedVariant: { name: '3.25 Carat (Panchdhatu Ring)', colorCode: '#8F5F2F' }
        }
      ]
    },
    'DG-10235': {
      id: 'DG-10235',
      email: 'priya@example.com',
      phone: '9206970970',
      date: 'June 25, 2026',
      status: 'Delivered',
      courier: 'Blue Dart',
      trackingNumber: 'BD987654321',
      address: 'Priya Patel, 102, Shanti Kutir, Drive-in Road, Ahmedabad - 380054, Gujarat, India',
      timeline: [
        { title: 'Order Placed', time: 'Jun 25, 11:30 AM', reached: true },
        { title: 'Processing', time: 'Jun 25, 4:00 PM', reached: true },
        { title: 'Shipped', time: 'Jun 26, 10:00 AM', reached: true },
        { title: 'Out for Delivery', time: 'Jun 27, 8:45 AM', reached: true },
        { title: 'Delivered', time: 'Jun 27, 2:15 PM', reached: true }
      ],
      items: [
        {
          id: 2,
          name: 'Natural Colombian Emerald (Panna)',
          price: 18000,
          quantity: 1,
          category: 'Gemstone',
          stoneType: 'Emerald',
          image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400',
          selectedVariant: { name: '2.5 Carat (Silver Pendant)', colorCode: '#E2D5B8' }
        }
      ]
    },
    'DG-10236': {
      id: 'DG-10236',
      email: 'amit@example.com',
      phone: '9999999999',
      date: 'June 20, 2026',
      status: 'Cancelled',
      courier: '',
      trackingNumber: '',
      address: 'Amit Shah, 12, Swati Residency, Bodakdev, Ahmedabad - 380054, Gujarat, India',
      cancellationNote: 'Order cancelled due to Vastu verification mismatch by pundit. A full refund of ₹25,000 has been credited to your payment method.',
      timeline: [
        { title: 'Order Placed', time: 'Jun 20, 10:00 AM', reached: true },
        { title: 'Processing', time: '', reached: false },
        { title: 'Shipped', time: '', reached: false },
        { title: 'Out for Delivery', time: '', reached: false },
        { title: 'Delivered', time: '', reached: false }
      ],
      items: [
        {
          id: 3,
          name: 'Natural Yellow Sapphire (Pukhraj)',
          price: 25000,
          quantity: 1,
          category: 'Gemstone',
          stoneType: 'Yellow Sapphire',
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
          selectedVariant: { name: '4.15 Carat (Loose Stone)', colorCode: '#E2D5B8' }
        }
      ]
    }
  };

  // State Management
  const [orderIdInput, setOrderIdInput] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [activeOrder, setActiveOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  // Form submission handler
  const handleLookup = (e) => {
    e.preventDefault();
    setSearchError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const queryId = orderIdInput.trim().toUpperCase();
      const contactVal = contactInput.trim().toLowerCase();

      const order = mockOrders[queryId];
      if (order && (order.email.toLowerCase() === contactVal || order.phone === contactVal)) {
        setActiveOrder(order);
      } else {
        setSearchError("We couldn't find an order matching those details. Please check your Order ID and try again, or contact us for help.");
      }
    }, 1200); // Simulated API latency
  };

  // Copy tracking number to clipboard
  const handleCopy = (num) => {
    navigator.clipboard.writeText(num);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Resolve status badge colors
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-accent-emerald/10 text-emerald-800 border border-accent-emerald/30';
      case 'Shipped':
      case 'Out for Delivery':
        return 'bg-amber-50 text-amber-800 border border-amber-200';
      case 'Cancelled':
      case 'Returned':
        return 'bg-red-50 text-red-800 border border-red-200';
      default:
        return 'bg-bg-section text-primary border border-secondary/35';
    }
  };

  // Get index of the current timeline stage
  const getCurrentStageIndex = (timeline) => {
    let lastReachedIndex = -1;
    for (let i = 0; i < timeline.length; i++) {
      if (timeline[i].reached) {
        lastReachedIndex = i;
      }
    }
    return lastReachedIndex;
  };

  return (
    <div className="min-h-screen bg-bg pt-12 pb-16 font-sans">
      <SeoHead 
        title="Track Your Order | Divya Gems" 
        description="Check the delivery progress of your spiritual gemstone, vastu tool, or astrology reports in real time." 
      />

      {/* ── STATE 1: LOOKUP FORM (DEFAULT) ── */}
      {!activeOrder ? (
        <div className="container-app py-8">
          <div className="max-w-md mx-auto bg-white border border-border rounded-card shadow-card p-6 sm:p-10 space-y-6">
            
            {/* Header Motif & Titles */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-secondary/20">
                <YantraMotif className="w-12 h-12" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <SectionHeading eyebrow="DELIVERY TRANSIT" title="Track Your Order" align="center" />
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                  Enter your order details below to check your delivery status.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleLookup} className="space-y-5">
              {/* Order ID */}
              <div className="space-y-1">
                <label htmlFor="order-id" className="block text-xs font-bold text-primary uppercase tracking-wider">
                  Order ID / Number
                </label>
                <input
                  id="order-id"
                  type="text"
                  required
                  disabled={isLoading}
                  placeholder="e.g. DG-10234"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  className="w-full text-sm border border-border bg-bg rounded-md px-3.5 py-2.5 outline-none focus:border-secondary transition-all"
                />
              </div>

              {/* Email / Phone */}
              <div className="space-y-1">
                <label htmlFor="contact-info" className="block text-xs font-bold text-primary uppercase tracking-wider">
                  Email or Mobile Number Used at Checkout
                </label>
                <input
                  id="contact-info"
                  type="text"
                  required
                  disabled={isLoading}
                  placeholder="e.g. rahul@example.com or 9824645978"
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  className="w-full text-sm border border-border bg-bg rounded-md px-3.5 py-2.5 outline-none focus:border-secondary transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={isLoading}
                  className="!bg-btn hover:!bg-btn-hover text-xs uppercase tracking-widest font-bold min-h-[44px]"
                >
                  Track Order
                </Button>
              </div>
            </form>

            {/* Error Message */}
            {searchError && (
              <div className="p-4 bg-red-50/50 border border-red-200 rounded-lg space-y-2 animate-fadeIn">
                <p className="text-xs font-medium text-red-900 leading-relaxed">
                  {searchError}
                </p>
                <div className="text-[11px] font-semibold flex gap-3 text-red-700">
                  <Link to="/contact" className="underline hover:text-red-950">Contact Us</Link>
                  <span>&middot;</span>
                  <a href="tel:9206970970" className="underline hover:text-red-950">Call Pundit Support</a>
                </div>
              </div>
            )}

          </div>
        </div>
      ) : (
        /* ── STATE 2: RESULT VIEW (SUCCESSFUL LOOKUP) ── */
        <div className="container-app space-y-8 animate-fadeIn max-w-4xl">
          
          {/* Back button to search */}
          <button
            onClick={() => setActiveOrder(null)}
            className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-secondary-dark flex items-center gap-1.5 cursor-pointer"
          >
            &larr; Back to Tracking
          </button>

          {/* 1. ORDER SUMMARY HEADER CARD */}
          <div className="bg-white border border-border rounded-card shadow-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <span className="block text-[10px] text-text-muted font-bold uppercase tracking-widest font-mono">
                Order Placement Info
              </span>
              <div className="flex items-center gap-3">
                <h2 className="font-mono text-lg font-bold text-primary">
                  {activeOrder.id}
                </h2>
                <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(activeOrder.status)}`}>
                  {activeOrder.status}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-muted">
                Placed on: <span className="font-medium text-primary">{activeOrder.date}</span>
              </p>
            </div>
          </div>

          {/* 2. STATUS TIMELINE */}
          {activeOrder.status === 'Cancelled' ? (
            /* Cancelled Order block */
            <div className="bg-red-50/40 border border-red-200 rounded-card p-6 flex gap-4 items-start shadow-sm">
              <div className="p-2 bg-white rounded-full text-red-600 shrink-0 shadow-inner">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-red-950 text-base">Order Cancelled</h3>
                <p className="text-xs sm:text-sm text-red-900 leading-relaxed max-w-2xl">
                  {activeOrder.cancellationNote}
                </p>
              </div>
            </div>
          ) : (
            /* Standard 5-stage timeline */
            <div className="bg-white border border-border rounded-card shadow-card p-6 sm:p-8">
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-border pb-3 mb-6 font-mono">
                Tracking Progress
              </h3>

              {/* Desktop Horizontal Stepper (hidden < 768px) */}
              <div className="hidden md:block">
                <div className="grid grid-cols-5 relative mb-4">
                  
                  {/* Stepper horizontal lines */}
                  <div className="absolute top-4 left-[10%] right-[10%] h-0.5 bg-border z-0" />
                  
                  {activeOrder.timeline.map((stage, idx) => {
                    const currentStageIdx = getCurrentStageIndex(activeOrder.timeline);
                    const isCompleted = idx < currentStageIdx;
                    const isCurrent = idx === currentStageIdx;
                    
                    return (
                      <div key={stage.title} className="flex flex-col items-center text-center relative z-10">
                        {/* Step Marker Circle */}
                        <div 
                          className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-accent-emerald border-accent-emerald text-white' 
                              : isCurrent 
                              ? 'bg-secondary border-secondary text-primary font-bold animate-pulse' 
                              : 'bg-white border-border text-text-muted'
                          }`}
                        >
                          {isCompleted ? (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                          ) : idx + 1}
                        </div>

                        {/* Title & Timestamp */}
                        <span className={`block text-xs font-bold uppercase tracking-wider mt-3 font-sans ${
                          isCurrent ? 'text-secondary-dark' : isCompleted ? 'text-primary font-semibold' : 'text-text-muted'
                        }`}>
                          {stage.title}
                        </span>
                        
                        {stage.time && (
                          <span className="block text-[10px] text-text-muted font-mono mt-1 leading-none">
                            {stage.time}
                          </span>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Dynamic Progress Line Overlay */}
                  <div 
                    className="absolute top-4 left-[10%] h-0.5 bg-accent-emerald transition-all duration-500 z-0" 
                    style={{ 
                      width: `${(getCurrentStageIndex(activeOrder.timeline) / (activeOrder.timeline.length - 1)) * 80}%` 
                    }}
                  />

                </div>
              </div>

              {/* Mobile Vertical Stepper (hidden >= 768px) */}
              <div className="block md:hidden space-y-6 relative pl-8">
                
                {/* Vertical timeline vertical connector line */}
                <div className="absolute top-2 bottom-2 left-4 w-0.5 bg-border z-0" />
                
                {/* Dynamic Progress Vertical Connector Line Overlay */}
                <div 
                  className="absolute top-2 left-4 w-0.5 bg-accent-emerald transition-all duration-500 z-0" 
                  style={{ 
                    height: `${(getCurrentStageIndex(activeOrder.timeline) / (activeOrder.timeline.length - 1)) * 95}%` 
                  }}
                />

                {activeOrder.timeline.map((stage, idx) => {
                  const currentStageIdx = getCurrentStageIndex(activeOrder.timeline);
                  const isCompleted = idx < currentStageIdx;
                  const isCurrent = idx === currentStageIdx;

                  return (
                    <div key={stage.title} className="relative z-10 flex gap-4 items-start">
                      {/* Step Circle */}
                      <div 
                        className={`absolute -left-8 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-accent-emerald border-accent-emerald text-white' 
                            : isCurrent 
                            ? 'bg-secondary border-secondary text-primary font-bold animate-pulse' 
                            : 'bg-white border-border text-text-muted'
                        }`}
                      >
                        {isCompleted ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        ) : idx + 1}
                      </div>

                      {/* Content details */}
                      <div className="space-y-0.5">
                        <span className={`block text-xs font-bold uppercase tracking-wider font-sans ${
                          isCurrent ? 'text-secondary-dark' : isCompleted ? 'text-primary font-semibold' : 'text-text-muted'
                        }`}>
                          {stage.title}
                        </span>
                        {stage.time && (
                          <span className="block text-[10px] text-text-muted font-mono leading-none">
                            {stage.time}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

              </div>

            </div>
          )}

          {/* 3. SHIPMENT DETAILS CARD */}
          {activeOrder.status !== 'Cancelled' && (
            <div className="bg-white border border-border rounded-card shadow-card p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Courier Left */}
              <div className="space-y-4 font-sans">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-border pb-2.5 font-mono">
                  Transit Details
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <span className="block text-[11px] font-bold text-text-muted uppercase tracking-wider">Courier Partner</span>
                    <p className="text-sm font-semibold text-primary">{activeOrder.courier}</p>
                  </div>
                  
                  <div>
                    <span className="block text-[11px] font-bold text-text-muted uppercase tracking-wider">Tracking ID</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-sm font-bold text-primary">{activeOrder.trackingNumber}</span>
                      <button
                        onClick={() => handleCopy(activeOrder.trackingNumber)}
                        className="text-text-muted hover:text-secondary cursor-pointer transition-colors p-1"
                        title="Copy tracking ID"
                      >
                        {copied ? (
                          <span className="text-[10px] text-accent-emerald font-bold uppercase font-mono tracking-wider">Copied</span>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25H9a2.251 2.251 0 0 0-2.15 1.586m10.05 0A2.25 2.25 0 0 1 16 3.75h-1.5a1.125 1.125 0 0 0-1.125 1.125v1.5a3.375 3.375 0 0 1-3.375 3.375H8.625A1.125 1.125 0 0 0 7.5 10.875v1.5a3.375 3.375 0 0 1-3.375 3.375H3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      as="a"
                      href={`https://google.com/search?q=track+${activeOrder.trackingNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      className="text-xs uppercase tracking-wider font-bold !py-2 !px-4"
                    >
                      Track on Courier Site &rarr;
                    </Button>
                  </div>
                </div>
              </div>

              {/* Delivery Right */}
              <div className="space-y-4 font-sans">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-border pb-2.5 font-mono">
                  Delivery Address
                </h4>
                <div>
                  <span className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Shipping Details</span>
                  <p className="text-sm text-text-primary leading-relaxed">
                    {activeOrder.address}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. ORDER ITEMS ROW */}
          <div className="bg-white border border-border rounded-card shadow-card p-6">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-border pb-3 mb-4 font-mono">
              Items In This Shipment
            </h3>
            <div className="divide-y divide-border/60">
              {activeOrder.items.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  readOnly={true} // Renders items in readOnly mode (steppers & deletes hidden)
                />
              ))}
            </div>
          </div>

          {/* 5. NEED HELP CARD */}
          <div className="bg-bg-section border border-border/80 rounded-card p-6 sm:p-7 space-y-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 font-sans">
            <div className="space-y-1.5">
              <h4 className="font-display text-primary text-base sm:text-lg font-bold">
                Having an issue with this order?
              </h4>
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-xl">
                If your order arrived damaged, incorrect, or you need support, read our{' '}
                <Link to="/return-policy" className="text-secondary font-bold hover:underline">
                  Return &amp; Refund Policy
                </Link>{' '}
                or contact our expert pundits for help.
              </p>
            </div>
            
            <Button
              as="Link"
              to="/contact"
              variant="outline"
              className="text-xs uppercase tracking-wider font-bold !py-2.5 px-6 min-h-[44px] shrink-0"
            >
              Contact Support
            </Button>
          </div>

        </div>
      )}

    </div>
  );
}

export default TrackOrder;
