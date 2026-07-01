import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';

export function ReturnPolicy() {
  const introContent = (
    <div className="space-y-8">
      <p className="text-sm sm:text-base leading-relaxed text-text-muted font-sans">
        At Divya Gems, we strive to ensure customer satisfaction with every purchase. Please read our policy carefully before placing an order.
      </p>
      
      {/* At-a-glance strip (3 small cards in a row, stack on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Exchange Only */}
        <div className="bg-white border border-border rounded-xl p-4 flex gap-3.5 items-start hover:border-secondary transition-all duration-200">
          <span className="text-secondary text-lg mt-0.5 shrink-0 select-none">🔄</span>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Exchange Only</h4>
            <p className="text-[12.5px] text-text-muted leading-snug">
              No refunds under normal circumstances
            </p>
          </div>
        </div>

        {/* 7 Days */}
        <div className="bg-white border border-border rounded-xl p-4 flex gap-3.5 items-start hover:border-secondary transition-all duration-200">
          <span className="text-secondary text-lg mt-0.5 shrink-0 select-none">📅</span>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">7 Days</h4>
            <p className="text-[12.5px] text-text-muted leading-snug">
              Request window from delivery, or 14 days from purchase &mdash; whichever is earlier
            </p>
          </div>
        </div>

        {/* Unboxing Video Required */}
        <div className="bg-white border border-border rounded-xl p-4 flex gap-3.5 items-start hover:border-secondary transition-all duration-200">
          <span className="text-secondary text-lg mt-0.5 shrink-0 select-none">📹</span>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Unboxing Required</h4>
            <p className="text-[12.5px] text-text-muted leading-snug">
              Mandatory video for any damage/defect claim
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const sectionsData = [
    {
      id: 'exchange-policy',
      heading: 'Exchange Policy',
      content: (
        <p>
          We stand behind the quality of our gemstones and products. If you are not satisfied with your purchase, you may request an exchange. Please note that we operate on an exchange-only policy under normal circumstances, and refunds are only issued in special cases as detailed below.
        </p>
      )
    },
    {
      id: 'eligibility',
      heading: 'Eligibility for Exchange',
      content: (
        <p>
          To be eligible for an exchange, your item must be in the same condition that you received it: unused, in its original packaging, and with all security tags and laboratory certificates intact. Gemstones that have been chipped, set into jewelry by external workshops, or altered in any way cannot be exchanged.
        </p>
      )
    },
    {
      id: 'return-address',
      heading: 'Return Address',
      content: (
        <p>
          All returns must be shipped to our showroom address: Divya Gems, 6/2, Bhuyangdev Society, Opp. Bhuyangdev BRTS Bus Stop, Memnagar, Ahmedabad &ndash; 380052, Gujarat, India. Please write your order number clearly on the outer package.
        </p>
      )
    },
    {
      id: 'damaged-defective',
      heading: 'Damaged, Defective or Missing Products',
      content: (
        <p>
          In the unlikely event that you receive a damaged, defective, or incorrect product, or if items are missing from your order, we will arrange for a replacement or exchange at no additional cost to you. Please report any such issues to our customer support team within 48 hours of delivery.
        </p>
      )
    },
    {
      id: 'unboxing-video',
      heading: 'Mandatory Unboxing Video Requirement',
      content: (
        <div className="bg-bg-section border border-border rounded-card p-6 flex flex-col sm:flex-row gap-4 items-start shadow-sm my-2">
          {/* Video Icon */}
          <div className="p-2 bg-white rounded-full text-secondary shrink-0 shadow-inner">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h4 className="font-display font-bold text-primary text-sm uppercase tracking-wider">Unboxing Verification Guidelines</h4>
            <p className="text-sm text-text-primary leading-relaxed">
              To process any claim for damaged, defective, incorrect, or missing items, a complete unboxing video is mandatory. The video must:
            </p>
            <ul className="list-disc pl-5 text-xs text-text-muted space-y-1">
              <li>Start before opening the package</li>
              <li>Clearly show all sides of the sealed parcel</li>
              <li>Clearly display the shipping label</li>
              <li>Record the entire unboxing process continuously without cuts, pauses, or edits</li>
            </ul>
            <p className="text-xs font-semibold text-red-700 pt-1 font-sans">
              * Claims submitted without a valid unboxing video may not be eligible for exchange or replacement.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'non-returnable',
      heading: 'Non-Returnable Items',
      content: (
        <p>
          Certain types of items cannot be returned or exchanged, including: Custom handcrafted jewelry orders (mountings, settings, and gold/silver metal charges), personalized Vastu remedies, energized yantras, and customized consultation reports.
        </p>
      )
    },
    {
      id: 'refunds',
      heading: 'Refund Policy',
      content: (
        <p>
          We do not offer cash or payment gateway refunds under normal circumstances. Refunds are only approved if: (a) The ordered item is out of stock and we cannot fulfill the order; (b) The item was lost in transit and delivery is not possible. Approved refunds will be processed to the original payment method within 5 to 7 business days.
        </p>
      )
    },
    {
      id: 'shipping-charges',
      heading: 'Return Shipping Charges',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
          {/* Fault is on our side */}
          <div className="border border-border bg-white p-5 rounded-xl space-y-3 hover:border-secondary transition-all">
            <h4 className="font-sans font-bold text-primary text-xs uppercase tracking-wider flex items-center gap-2">
              <span className="text-emerald-700 text-sm">✓</span>
              If the mistake is on our side
            </h4>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              Divya Gems will bear the return and replacement shipping costs if:
            </p>
            <ul className="list-disc pl-5 text-xs text-text-primary space-y-1 leading-normal">
              <li>Wrong product was delivered</li>
              <li>Product was received damaged or defective</li>
              <li>Product was incomplete due to our packing error</li>
            </ul>
          </div>
          
          {/* Client request return */}
          <div className="border border-border bg-white p-5 rounded-xl space-y-3 hover:border-secondary transition-all">
            <h4 className="font-sans font-bold text-primary text-xs uppercase tracking-wider flex items-center gap-2">
              <span className="text-secondary-dark text-sm">➔</span>
              If you request the return
            </h4>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              Return shipping charges will be borne by the customer if you ordered the wrong item, changed your mind, or wish to exchange for personal reasons. Original shipping charges, if any, are non-refundable.
            </p>
            <p className="text-[11px] text-text-muted font-sans border-t border-border/60 pt-2 leading-relaxed">
              * For international orders, all return shipping, customs duties, taxes, and related expenses must be borne by the customer unless the error was made by Divya Gems.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      heading: 'Contact Us',
      content: (
        <p className="text-text-muted">
          For any questions regarding returns, exchanges, or refunds, please reach out to our customer support team using the contacts below.
        </p>
      )
    }
  ];

  return (
    <LegalPageLayout
      title="Return, Exchange & Refund Policy"
      lastUpdated="June 2026"
      intro={introContent}
      sections={sectionsData}
    />
  );
}

export default ReturnPolicy;
