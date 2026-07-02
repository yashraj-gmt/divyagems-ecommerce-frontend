import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SeoHead from '../components/seo/SeoHead';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import TrendingNow from '../components/home/TrendingNow';
import Button from '../components/common/Button';
import YantraMotif from '../components/common/YantraMotif';
import useProducts from '../hooks/useProducts';

// Animated price counter component
function AnimatedPrice({ value }) {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    let startTimestamp = null;
    const duration = 250; // ms
    const startValue = displayValue;
    const endValue = value;
    
    if (startValue === endValue) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (endValue - startValue) + startValue);
      setDisplayValue(current);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value, displayValue]);

  return <span>₹{displayValue.toLocaleString('en-IN')}</span>;
}

export function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { products: allProducts } = useProducts();
  const navigate = useNavigate();

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isCouponFocused, setIsCouponFocused] = useState(false);

  // Cart summary math
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const freeShippingThreshold = 5999;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  let discount = 0;
  if (activeCoupon) {
    if (activeCoupon.type === 'percent') {
      discount = Math.round((subtotal * activeCoupon.value) / 100);
    } else if (activeCoupon.type === 'flat') {
      discount = activeCoupon.value;
    }
  }

  const finalTotal = Math.max(0, subtotal - discount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Available sample coupons for testing
  const validCoupons = {
    'DIVYA10': { code: 'DIVYA10', type: 'percent', value: 10 },
    'FESTIVE15': { code: 'FESTIVE15', type: 'percent', value: 15 },
    'WELCOME500': { code: 'WELCOME500', type: 'flat', value: 500 }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (validCoupons[code]) {
      setActiveCoupon(validCoupons[code]);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try DIVYA10 or WELCOME500.');
    }
  };

  const handleRemoveCoupon = () => {
    setActiveCoupon(null);
  };

  // Cross sell items (excluding items already in the cart)
  const cartIds = cart.map(item => item.id);
  const crossSellProducts = allProducts
    .filter(p => !cartIds.includes(p.id))
    .slice(0, 6)
    .map(p => ({ ...p, trending: true }));

  const handleCheckout = () => {
    alert('Thank you! Redirecting to secure checkout...');
  };

  return (
    <div className="min-h-screen bg-bg pt-12 pb-24 font-sans text-left">
      <SeoHead 
        title="Your Shopping Cart | Divya Gems" 
        description="Review items in your cart, apply discounts, and complete your purchase securely at Divya Gems." 
      />

      <div className="container-app">
        {/* Breadcrumbs */}
        <nav className="text-xs text-text-muted font-mono mb-4 uppercase tracking-wider select-none">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-primary font-semibold">Cart</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-row items-baseline gap-2.5 border-b border-border pb-5 mb-8 select-none">
          <h1 className="font-display text-primary text-2xl sm:text-3xl font-bold">Your Shopping Cart</h1>
          {cart.length > 0 && (
            <span className="text-text-muted text-xs sm:text-sm font-semibold">
              ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </span>
          )}
        </div>

        {/* ── EMPTY CART STATE ── */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 px-4 space-y-6 max-w-md mx-auto bg-white rounded-2xl border border-border shadow-xs relative overflow-hidden select-none">
            {/* Background Motif */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <svg className="w-80 h-80 text-primary" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M7.5 7.5l9 9M7.5 16.5l9-9" />
              </svg>
            </div>
            
            <div className="w-16 h-16 rounded-full bg-secondary-light/10 border border-secondary/20 flex items-center justify-center relative z-10 text-secondary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H3.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 4.513 7.5h14.974c.577 0 1.054.409 1.12 1.007Z" />
              </svg>
            </div>
            
            <div className="space-y-2 relative z-10">
              <h2 className="font-display text-primary text-xl sm:text-2xl font-bold">Your cart is empty</h2>
              <p className="text-text-muted text-sm leading-relaxed font-sans max-w-xs mx-auto">
                Explore our authentic gemstones, Shree Yantras, and vastu remedies to begin your journey of positive energy.
              </p>
            </div>
            
            <Button
              as={Link}
              to="/products"
              variant="primary"
              className="text-xs uppercase tracking-wider font-bold min-h-[44px] px-8 rounded-full shadow-md hover:scale-102 transition-transform relative z-10"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          /* ── TWO-COLUMN CART CONTENT ── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* LEFT — CART ITEMS LIST (~65%) */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="space-y-1">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-6">
                <Link 
                  to="/products"
                  className="px-6 py-2.5 rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-primary transition-all duration-300 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 w-fit"
                >
                  <span>&larr;</span> Continue Shopping
                </Link>
              </div>
            </div>

            {/* RIGHT — ORDER SUMMARY (~35%) */}
            <div className="lg:col-span-4 sticky top-[100px] space-y-6">
              
              <div className="bg-white rounded-2xl shadow-sm border border-border p-6 space-y-6">
                <h3 className="font-display text-primary text-lg font-bold border-b border-border pb-3 text-left">
                  Order Summary
                </h3>

                {/* Subtotal, Discount, Shipping rows */}
                <div className="space-y-4 text-sm text-left">
                  <div className="flex justify-between items-center text-text-muted">
                    <span>Subtotal</span>
                    <span className="font-mono text-primary font-bold">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {activeCoupon && (
                    <div className="flex justify-between items-center text-accent-emerald font-semibold">
                      <span>Discount ({activeCoupon.code})</span>
                      <span className="font-mono">
                        -₹{discount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-start text-text-muted border-b border-border/40 pb-4">
                    <span>Shipping Charges</span>
                    <div className="text-right">
                      {isFreeShipping ? (
                        <span className="text-accent-emerald font-bold">Free</span>
                      ) : (
                        <span className="font-sans text-xs text-primary font-semibold">Calculated at checkout</span>
                      )}
                    </div>
                  </div>

                  {/* Free Shipping Up-sell Progress Bar */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-text-muted uppercase tracking-wider">Delivery Progress</span>
                      <span className={isFreeShipping ? "text-accent-emerald" : "text-secondary"}>
                        {isFreeShipping ? "Free shipping unlocked!" : `₹${subtotal.toLocaleString('en-IN')} / ₹${freeShippingThreshold.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-bg border border-border/40 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 rounded-full ${isFreeShipping ? 'bg-accent-emerald' : 'bg-secondary'}`}
                        style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                    {!isFreeShipping && (
                      <p className="text-[10px] text-text-muted leading-relaxed">
                        Add <span className="font-mono font-bold text-primary">₹{remainingForFreeShipping.toLocaleString('en-IN')}</span> more to qualify for free delivery.
                      </p>
                    )}
                  </div>
                </div>

                {/* Coupon Code Module */}
                <div className="border-t border-border/60 pt-5 space-y-3 text-left">
                  <span className="block text-xs font-bold text-primary uppercase tracking-wider">
                    Promo / Coupon Code
                  </span>
                  
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. DIVYA10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      onFocus={() => setIsCouponFocused(true)}
                      onBlur={() => setIsCouponFocused(false)}
                      className="border rounded-xl px-3.5 py-2 text-xs sm:text-sm bg-bg outline-none transition-all duration-200 flex-1"
                      style={{
                        borderColor: isCouponFocused ? '#C89B3C' : '#E2D5B8',
                        boxShadow: isCouponFocused ? '0 0 0 3px rgba(200, 155, 60, 0.15)' : 'none'
                      }}
                    />
                    <Button 
                      type="submit"
                      variant="outline" 
                      className="!py-1 px-4 text-xs font-bold uppercase tracking-wider rounded-xl border-secondary hover:bg-secondary hover:text-primary transition-all shrink-0"
                    >
                      Apply
                    </Button>
                  </form>
                  
                  {couponError && (
                    <p className="text-xs font-semibold" style={{ color: '#B23B3B' }}>
                      {couponError}
                    </p>
                  )}

                  {/* Active Coupon Chip */}
                  {activeCoupon && (
                    <div className="flex items-center gap-1.5 bg-accent-emerald/10 text-accent-emerald px-2.5 py-1 rounded-full text-xs font-bold w-fit uppercase tracking-wider animate-fadeIn select-none">
                      <span>{activeCoupon.code}</span>
                      <button 
                        type="button" 
                        onClick={handleRemoveCoupon}
                        className="hover:text-red-700 transition-colors text-xs font-mono font-bold cursor-pointer inline-block ml-1"
                      >
                        &times;
                      </button>
                    </div>
                  )}
                </div>

                {/* Grand Total */}
                <div className="border-t border-border pt-4 flex justify-between items-center text-primary font-bold">
                  <span className="text-base uppercase tracking-wider">Total</span>
                  <span className="font-mono text-xl text-primary font-bold">
                    <AnimatedPrice value={finalTotal} />
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  variant="primary"
                  fullWidth
                  className="text-xs uppercase tracking-widest font-bold py-4 rounded-full min-h-[48px] shadow-md transition-all duration-300 hover:scale-102 hover:shadow-lg"
                >
                  Proceed to Checkout
                </Button>

                {/* Security and Support Trust Row */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-text-muted font-sans border-t border-border/60 pt-5 leading-snug select-none">
                  <div className="space-y-1.5 flex flex-col items-center">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <span className="font-bold text-primary block">Secure Checkout</span>
                  </div>
                  <div className="space-y-1.5 flex flex-col items-center border-x border-border/40 px-1">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.656 48.656 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7C4.793 9.547 4.75 10.768 4.75 12s.043 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7C19.454 14.453 19.5 13.232 19.5 12Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
                    </svg>
                    <span className="font-bold text-primary block">Easy Returns</span>
                  </div>
                  <div className="space-y-1.5 flex flex-col items-center">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m.9 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.5m-9-3.5h10.5M3 8.25m0 5.25h16.5M3 8.25a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v5.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8.25Z" />
                    </svg>
                    <span className="font-bold text-primary block">Free Shipping</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}
      </div>

      {/* ── MOBILE STICKY BOTTOM CHECKOUT BAR (<1024px) ── */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-5 py-4 flex items-center justify-between z-30 lg:hidden shadow-lg animate-slideUp">
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Total Amount</span>
            <span className="font-mono text-lg font-bold text-primary">
              <AnimatedPrice value={finalTotal} />
            </span>
          </div>
          
          <Button
            onClick={handleCheckout}
            variant="primary"
            className="text-xs uppercase tracking-widest font-bold px-7 py-3 rounded-full min-h-[44px] shrink-0 shadow-md"
          >
            Checkout ({cartCount})
          </Button>
        </div>
      )}

      {/* ── CROSS-SELL PRODUCTS ROW (Only show if cart has >=1 item) ── */}
      {cart.length > 0 && crossSellProducts.length > 0 && (
        <div className="mt-20 border-t border-border">
          <TrendingNow
            products={crossSellProducts}
            eyebrow="COMPLETE YOUR RITUAL"
            title="You May Also Like"
            subtitle=""
            bgClassName="bg-bg-section"
            filterTrending={false}
          />
        </div>
      )}

    </div>
  );
}

export default Cart;
