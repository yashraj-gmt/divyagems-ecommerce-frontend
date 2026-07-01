import React from 'react';

export function ShippingPolicy() {
  return (
    <div className="bg-bg min-h-screen py-16 text-text-primary">
      <div className="container-app max-w-3xl">
        <div className="bg-white p-6 md:p-10 rounded-md border border-border shadow-card space-y-8">
          {/* Header */}
          <div className="border-b border-border pb-6 text-center md:text-left">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">Customer Support</span>
            <h1 className="text-2xl md:text-3xl font-bold text-primary mt-1">Shipping & Delivery Policy</h1>
            <p className="text-text-secondary text-xs md:text-sm mt-1">Last Updated: January 1, 2026</p>
          </div>

          {/* Sections */}
          <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-primary">1. Free Insured Delivery</h2>
              <p>
                Divya Gems offers free shipping on all orders delivered within India. Because of the high value of loose gemstones, all shipments are fully insured by our logistics partners during transit. Your delivery is 100% risk-free.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-primary">2. Processing & Dispatch</h2>
              <p>
                Orders are processed and dispatched within 1 to 2 business days after verifying payment and certificate documentation. If your order includes a custom jewelry mounting (such as a gold ring, silver pendant, or bracelet), please allow an additional 3 to 5 business days for expert handcrafting.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-primary">3. Delivery Timelines</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Metro Cities (Delhi, Mumbai, Bengaluru, Ahmedabad, etc.):</strong> 2 - 4 business days.</li>
                <li><strong>Non-Metro Cities & Tier-2/3 Towns:</strong> 3 - 6 business days.</li>
                <li><strong>Northeast & Remote Regions:</strong> 5 - 8 business days.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-primary">4. Packaging Security</h2>
              <p>
                Every order is shipped in a specialized, tamper-evident secure capsule bubble box. We advise all clients not to accept deliveries where the outer box seal appears cut, torn, or re-taped. If you receive a damaged package, report it immediately to our hotline.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-primary">5. Order Tracking</h2>
              <p>
                Upon dispatch, a tracking link and consignment code will be sent to your registered mobile number and email. You can monitor transit milestones in real-time or log into the "Track Order" portal on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingPolicy;
