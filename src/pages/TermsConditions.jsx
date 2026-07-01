import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';

export function TermsConditions() {
  const introText = "Welcome to Divya Gems. By accessing and using our website (divyagems.in) and our services, you agree to be bound by the following Terms & Conditions. Please read them carefully before using our platform or purchasing our products.";

  const sectionsData = [
    {
      id: 'overview',
      heading: 'Overview',
      content: (
        <p>
          This website is operated by Divya Gems. Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to Divya Gems. By visiting our site and/or purchasing something from us, you engage in our &ldquo;Service&rdquo; and agree to be bound by the following terms and conditions, including those additional terms and conditions and policies referenced herein and/or available by hyperlink.
        </p>
      )
    },
    {
      id: 'online-store-terms',
      heading: 'Online Store Terms',
      content: (
        <p>
          By agreeing to these Terms &amp; Conditions, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose, nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
        </p>
      )
    },
    {
      id: 'products-services',
      heading: 'Products & Services',
      content: (
        <p>
          We make every effort to display as accurately as possible the colors, shapes, and details of our gemstones and products. Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return &amp; Refund Policy.
        </p>
      )
    },
    {
      id: 'spiritual-disclaimer',
      heading: 'Spiritual Products Disclaimer',
      content: (
        <div className="bg-bg-section border border-border rounded-card p-6 flex flex-col sm:flex-row gap-4 items-start shadow-sm my-2">
          {/* Info Icon */}
          <div className="p-2 bg-white rounded-full text-secondary shrink-0 shadow-inner">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.083.87l-.497 1.74a.75.75 0 00.344.882l.49.27m-1.077-1.91l-.49-.27m-5.6 5.6h16.5" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <div className="space-y-2">
            <h4 className="font-display font-bold text-primary text-sm uppercase tracking-wider">Astrological &amp; Belief Disclaimer</h4>
            <p className="text-sm text-text-primary leading-relaxed">
              Many products offered by Divya Gems are based on traditional spiritual, astrological, Vastu, and metaphysical beliefs. The effectiveness of gemstones, crystals, yantras, Vastu remedies, astrology consultations, or spiritual products may vary from person to person. We do not guarantee specific financial outcomes, health improvements, relationship outcomes, career success, business growth, or any particular result from using our products or recommendations. All products and services are offered for spiritual, traditional, and personal belief purposes only.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'pricing-payments',
      heading: 'Pricing & Payments',
      content: (
        <p>
          Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.
        </p>
      )
    },
    {
      id: 'order-acceptance',
      heading: 'Order Acceptance & Cancellation',
      content: (
        <p>
          We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the email and/or billing address/phone number provided at the time the order was made.
        </p>
      )
    },
    {
      id: 'shipping',
      heading: 'Shipping',
      content: (
        <p>
          Orders are shipped to the address provided by you at the time of order placement. Shipping fees and delivery timelines are detailed in our Shipping Policy. We are not responsible for delays caused by postal services, customs clearance, or incorrect delivery information provided by the customer.
        </p>
      )
    },
    {
      id: 'returns-exchanges',
      heading: 'Returns & Exchanges',
      content: (
        <p>
          Returns and exchanges are handled in accordance with our Return &amp; Refund Policy. Loose gemstones must be returned in their original condition with certificates and tags intact. Custom jewelry mountings are subject to metal and making charge exclusions.
        </p>
      )
    },
    {
      id: 'accuracy-information',
      heading: 'Accuracy of Information',
      content: (
        <p>
          While we strive to ensure that all information on this website is complete, accurate, and current, we are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only.
        </p>
      )
    },
    {
      id: 'intellectual-property',
      heading: 'Intellectual Property',
      content: (
        <p>
          All content, custom graphics, logo marks, product photographs, and text layouts displayed on this website are the intellectual property of Divya Gems. Any reuse, reproduction, or duplication without prior written consent is strictly prohibited.
        </p>
      )
    },
    {
      id: 'prohibited-uses',
      heading: 'Prohibited Uses',
      content: (
        <div className="space-y-2">
          <p>
            In addition to other prohibitions as set forth in the Terms &amp; Conditions, you are prohibited from using the site or its content:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>For any unlawful purpose;</li>
            <li>To solicit others to perform or participate in any unlawful acts;</li>
            <li>To violate any international, federal, provincial or state regulations, rules, laws, or local ordinances;</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
            <li>To submit false or misleading information;</li>
            <li>To upload or transmit viruses or any other type of malicious code.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'limitation-liability',
      heading: 'Limitation of Liability',
      content: (
        <div className="space-y-2">
          <p>Divya Gems shall not be liable for:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Indirect or consequential damages</li>
            <li>Loss of profits</li>
            <li>Loss of business opportunities</li>
            <li>Emotional distress arising from product usage</li>
            <li>Dissatisfaction resulting from spiritual or astrological recommendations</li>
          </ul>
          <p className="mt-2 text-text-muted">
            All products and services are provided on an &apos;as is&apos; and &apos;as available&apos; basis.
          </p>
        </div>
      )
    },
    {
      id: 'third-party-links',
      heading: 'Third-Party Links',
      content: (
        <p>
          Certain content, products, and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites.
        </p>
      )
    },
    {
      id: 'privacy',
      heading: 'Privacy',
      content: (
        <p>
          Your submission of personal information through the store is governed by our Privacy Policy. Please review our Privacy Policy for details on how we collect, store, and protect your customer information.
        </p>
      )
    },
    {
      id: 'governing-law',
      heading: 'Governing Law',
      content: (
        <div className="space-y-2">
          <p>
            These Terms &amp; Conditions shall be governed by and interpreted in accordance with the laws of India.
          </p>
          <p className="font-bold text-primary">
            Any disputes arising from the use of this website shall be subject to the jurisdiction of courts located in Ahmedabad, Gujarat, India.
          </p>
        </div>
      )
    },
    {
      id: 'changes',
      heading: 'Changes to Terms & Conditions',
      content: (
        <p>
          We reserve the right, at our sole discretion, to update, change, or replace any part of these Terms &amp; Conditions by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.
        </p>
      )
    },
    {
      id: 'contact-info',
      heading: 'Contact Information',
      content: (
        <p className="text-text-muted">
          Questions about the Terms &amp; Conditions should be sent to us via email at info@divyagems.in or by calling +91 92069 70970.
        </p>
      )
    }
  ];

  return (
    <LegalPageLayout
      title="Terms & Conditions"
      lastUpdated="June 2026"
      intro={introText}
      sections={sectionsData}
    />
  );
}

export default TermsConditions;
