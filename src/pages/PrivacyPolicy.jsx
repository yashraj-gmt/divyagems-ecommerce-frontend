import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';

export function PrivacyPolicy() {
  const introText = "At Divya Gems (\"we\", \"our\", \"us\"), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, make a purchase, or interact with our services. By using our website and services, you agree to the collection and use of information in accordance with this Privacy Policy.";

  const sectionsData = [
    {
      id: 'collect',
      heading: 'Information We Collect',
      content: (
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-primary">Information You Provide Directly</p>
            <p className="text-text-muted mt-1">When you place an order, contact us, or interact with our website, we may collect:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-text-primary">
              <li>Full Name, Email Address, and Mobile Number</li>
              <li>Billing Address and Shipping Address</li>
              <li>Payment Information (processed securely through payment gateways)</li>
              <li>Order Details and Customer Support Communications</li>
            </ul>
          </div>
          <div className="pt-2">
            <p className="font-semibold text-primary">Information Collected Automatically</p>
            <p className="text-text-muted mt-1">When you visit our website, we may automatically collect:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-text-primary">
              <li>IP Address and Browser Type</li>
              <li>Device Information and Website Usage Data</li>
              <li>Cookies and Similar Technologies</li>
              <li>Pages Visited and Browsing Activity</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'use-info',
      heading: 'How We Use Your Information',
      content: (
        <div className="space-y-3">
          <p>
            <strong className="text-primary">Process and Fulfill Orders</strong> &mdash; process payments, ship products, provide order confirmations and tracking details, manage exchanges and customer support requests.
          </p>
          <p>
            <strong className="text-primary">Customer Support</strong> &mdash; respond to inquiries, resolve complaints, provide after-sales support.
          </p>
          <p>
            <strong className="text-primary">Marketing &amp; Promotions</strong> &mdash; with your consent, we may send promotional offers, product updates, newsletters, special event notifications. You may unsubscribe from marketing communications at any time.
          </p>
        </div>
      )
    },
    {
      id: 'security-fraud',
      heading: 'Security & Fraud Prevention',
      content: (
        <p>
          We use customer information to verify transactions, detect fraud, prevent unauthorized access, and protect our website and users.
        </p>
      )
    },
    {
      id: 'spiritual-confidentiality',
      heading: 'Spiritual Consultation & Customer Data Confidentiality',
      isSpecial: true,
      content: (
        <p className="font-semibold text-[#0F4D3A] bg-accent-emerald/5 p-4 rounded-lg border-l-2 border-accent-emerald leading-relaxed">
          Many of our products and services relate to astrology, vastu, healing, gemstones, yantras, and spiritual consultations. Any information shared by customers for astrology consultations, gemstone recommendations, horoscope analysis, vastu consultations, spiritual guidance, or personal reports is treated with strict confidentiality. We do not sell, rent, or share such information with any third party unless required by law.
        </p>
      )
    },
    {
      id: 'cookies',
      heading: 'Cookies',
      content: (
        <p>
          Our website may use cookies and similar technologies to improve website performance, remember user preferences, analyze website traffic, and enhance user experience. You may disable cookies through your browser settings, although certain features of the website may not function properly.
        </p>
      )
    },
    {
      id: 'third-party',
      heading: 'Third-Party Service Providers',
      content: (
        <div className="space-y-2">
          <p>
            We may share limited information with trusted third parties solely for business operations, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Payment gateways and secure transaction services</li>
            <li>Shipping and courier partners for physical delivery</li>
            <li>Website hosting providers and database management systems</li>
            <li>Marketing service providers and newsletter distributors</li>
            <li>Analytics providers and site behavior monitoring tools</li>
          </ul>
          <p className="pt-2 text-text-muted">
            These service providers are authorized to use your information only as necessary to perform services on our behalf.
          </p>
        </div>
      )
    },
    {
      id: 'data-security',
      heading: 'Data Security',
      content: (
        <p>
          We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, loss, misuse, disclosure, and alteration. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.
        </p>
      )
    },
    {
      id: 'third-party-links',
      heading: 'Third-Party Links',
      content: (
        <p>
          Our website may contain links to third-party websites. We are not responsible for the privacy practices, content, or security of such external websites. We encourage users to review the privacy policies of any third-party sites they visit.
        </p>
      )
    },
    {
      id: 'children-privacy',
      heading: "Children's Privacy",
      content: (
        <p>
          Our services are not directed toward children under the age of 18. We do not knowingly collect personal information from minors.
        </p>
      )
    },
    {
      id: 'changes',
      heading: 'Changes to This Privacy Policy',
      content: (
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our business practices, legal requirements, or operational needs. Any changes will be posted on this page with an updated revision date.
        </p>
      )
    },
    {
      id: 'contact-us',
      heading: 'Contact Us',
      content: (
        <p className="text-text-muted">
          If you have any questions regarding this Privacy Policy or wish to exercise your privacy rights, please refer to the support options detailed in the contact block below.
        </p>
      )
    }
  ];

  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="June 2026"
      intro={introText}
      sections={sectionsData}
    />
  );
}

export default PrivacyPolicy;
