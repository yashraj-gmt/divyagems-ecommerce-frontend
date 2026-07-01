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
    .map(p => ({ ...p, trending: true })); // Tag as trending so TrendingNow lists them

  const handleCheckout = () => {
    // Navigate to checkout or print message
    alert('Thank you! Redirecting to secure checkout...');
  };

  return (
    <div className="min-h-screen bg-bg pt-12 pb-16 font-sans">
      <SeoHead 
        title="Your Shopping Cart | Divya Gems" 
        description="Review items in your cart, apply discounts, and complete your purchase securely at Divya Gems." 
      />

      <div className="container-app">
        {/* Breadcrumbs */}
        <div className="text-xs text-text-muted font-mono mb-2 uppercase tracking-wider select-none">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-primary font-semibold">Cart</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-row items-baseline gap-2.5 border-b border-border pb-5 mb-8">
          <h1 className="font-display text-primary text-2xl sm:text-3xl font-bold">Your Cart</h1>
          {cart.length > 0 && (
            <span className="text-text-muted text-xs sm:text-sm font-semibold">
              ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </span>
          )}
        </div>

        {/* ── EMPTY CART STATE ── */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 px-4 space-y-6 max-w-md mx-auto">
            <div className="text-primary/10 w-24 h-24 flex items-center justify-center relative">
              <YantraMotif className="w-20 h-20" strokeWidth={1} />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-primary text-xl sm:text-2xl font-bold">
                Your cart is empty
              </h2>
              <p className="text-text-muted text-sm leading-relaxed font-sans">
                Explore our gemstones, yantras, and vastu remedies to begin your journey of positive energy.
              </p>
            </div>
            <Button
              as="Link"
              to="/products"
              variant="primary"
              className="text-xs uppercase tracking-wider font-bold min-h-[44px] px-8"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          /* ── TWO-COLUMN CART CONTENT ── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* LEFT — CART ITEMS LIST (~65%) */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="border-t border-border">
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
                  className="text-sm font-semibold text-secondary hover:text-secondary-dark transition-colors inline-flex items-center gap-1.5"
                >
                  <span>&larr;</span> Continue Shopping
                </Link>
              </div>
            </div>

            {/* RIGHT — ORDER SUMMARY (~35%) */}
            <div className="lg:col-span-4 sticky top-[100px] space-y-6">
              
              <div className="bg-white rounded-card shadow-card border border-border p-6 space-y-6">
                <h3 className="font-display text-primary text-lg font-bold border-b border-border pb-3">
                  Order Summary
                </h3>

                {/* Subtotal, Discount, Shipping rows */}
                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between items-center text-text-muted">
                    <span>Subtotal</span>
                    <span className="font-mono text-primary font-medium">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {activeCoupon && (
                    <div className="flex justify-between items-center text-accent-emerald">
                      <span>Discount ({activeCoupon.code})</span>
                      <span className="font-mono font-medium">
                        -₹{discount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-start text-text-muted">
                    <span>Shipping</span>
                    <div className="text-right">
                      {isFreeShipping ? (
                        <span className="text-accent-emerald font-semibold">Free</span>
                      ) : (
                        <span className="font-sans font-medium text-xs">Calculated at checkout</span>
                      )}
                    </div>
                  </div>

                  {/* Free Shipping Up-sell Notification */}
                  {!isFreeShipping && (
                    <p className="text-[11px] text-secondary font-medium leading-relaxed bg-bg-section/60 p-2.5 rounded border border-border/40 mt-1">
                      Add <span className="font-mono font-semibold">₹{remainingForFreeShipping.toLocaleString('en-IN')}</span> more for free delivery
                    </p>
                  )}
                </div>

                {/* Coupon Code Module */}
                <div className="border-t border-border pt-5 space-y-3">
                  <span className="block text-xs font-bold text-primary uppercase tracking-wider">
                    Coupon Code
                  </span>
                  
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. DIVYA10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="border border-border rounded-md px-3 py-1.5 text-xs sm:text-sm bg-bg outline-none focus:border-secondary flex-1"
                    />
                    <Button 
                      type="submit"
                      variant="outline" 
                      className="!py-1 px-4 text-xs font-bold uppercase tracking-wider border-secondary hover:bg-secondary hover:text-text-inverse shrink-0"
                    >
                      Apply
                    </Button>
                  </form>
                  
                  {couponError && (
                    <p className="text-[11.5px] font-medium" style={{ color: '#B23B3B' }}>
                      {couponError}
                    </p>
                  )}

                  {/* Active Coupon Chip */}
                  {activeCoupon && (
                    <div className="flex items-center gap-1.5 bg-accent-emerald/10 text-accent-emerald px-2.5 py-1 rounded-full text-xs font-bold w-fit uppercase tracking-wider animate-fadeIn">
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
                  <span className="text-base">Total</span>
                  <span className="font-mono text-xl text-primary">
                    <AnimatedPrice value={finalTotal} />
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  variant="primary"
                  fullWidth
                  className="!bg-btn hover:!bg-btn-hover text-xs uppercase tracking-widest font-bold py-3.5 min-h-[48px] shadow-sm"
                >
                  Proceed to Checkout
                </Button>

                {/* Security and Support Trust Row */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-text-muted font-sans border-t border-border/80 pt-4 leading-snug">
                  <div className="space-y-1">
                    <span className="text-secondary text-base block select-none">🔒</span>
                    <span className="font-bold text-primary block">Secure</span>
                    <span>Checkout</span>
                  </div>
                  <div className="space-y-1 border-x border-border/60">
                    <span className="text-secondary text-base block select-none">🔄</span>
                    <span className="font-bold text-primary block">Easy</span>
                    <span>Exchange</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-secondary text-base block select-none">🚚</span>
                    <span className="font-bold text-primary block">Free Delivery</span>
                    <span>₹5999+</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}
      </div>

      {/* ── MOBILE STICKY BOTTOM CHECKOUT BAR (<1024px) ── */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 flex items-center justify-between z-30 lg:hidden shadow-lg animate-slideUp">
          <div className="flex flex-col">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Total Amount</span>
            <span className="font-mono text-lg font-bold text-primary">
              <AnimatedPrice value={finalTotal} />
            </span>
          </div>
          
          <Button
            onClick={handleCheckout}
            variant="primary"
            className="!bg-btn hover:!bg-btn-hover text-xs uppercase tracking-widest font-bold px-6 py-2.5 min-h-[44px] shrink-0"
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
            filterTrending={false} // List all selected cross-sell products
          />
        </div>
      )}

    </div>
  );
}

export default Cart;
