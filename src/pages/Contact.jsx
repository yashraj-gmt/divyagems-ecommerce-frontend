import React from 'react';
import SeoHead from '../components/seo/SeoHead';
import SectionHeading from '../components/common/SectionHeading';
import ContactForm from '../components/forms/ContactForm';

export function Contact() {
  return (
    <div className="min-h-screen bg-bg">
      <SeoHead 
        title="Contact Us | Divya Gems" 
        description="Get in touch with Divya Gems for Vastu consultation, gemstone recommendations, and astrological advice. Reach us via phone, email, or visit our showroom in Ahmedabad." 
      />

      {/* ── SECTION 1: HEADER (bg-[#151112]) ── */}
      <section className="relative overflow-hidden bg-[#151112] text-text-inverse py-16 border-b border-border">
        {/* Subtle Yantra watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <svg className="w-96 h-96 text-secondary" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M7.5 7.5l9 9M7.5 16.5l9-9" />
          </svg>
        </div>

        <div className="container-app relative z-10 text-center max-w-4xl mx-auto space-y-3">
          <span className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-secondary font-bold">GET IN TOUCH</span>
          <h1 className="font-display text-text-inverse text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
          <div className="w-[60px] h-[3px] bg-secondary mx-auto mt-2" />
        </div>
      </section>

      {/* ── SECTION 2: FORM & INFO (bg-bg) ── */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* LEFT — CONTACT FORM: Left on desktop (~60%), 2nd on mobile */}
            <div className="lg:col-span-7 order-2 lg:order-1 bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-border">
              <h2 className="font-display text-primary text-lg sm:text-xl font-bold mb-6 text-left">
                Send an Inquiry
              </h2>
              <ContactForm />
            </div>

            {/* RIGHT — CONTACT INFO PANEL: Right on desktop (~40%), 1st on mobile */}
            <div className="lg:col-span-5 order-1 lg:order-2 bg-[#FAF8F5] rounded-2xl p-6 md:p-8 border border-border/80 flex flex-col justify-between space-y-8 text-left">
              
              {/* Stacked Info Rows */}
              <div className="space-y-6 font-sans">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Address</h4>
                    <p className="text-[13.5px] text-text-primary leading-relaxed font-sans">
                      6/2, Bhuyangdev Society, Opp. Bhuyangdev BRTS Bus Stop, Memnagar, Ahmedabad &ndash; 380052, Gujarat, India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.302a12.017 12.017 0 0 1-5.905-5.905c-.242-.44-.076-.927.302-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Phone</h4>
                    <a 
                      href="tel:9206970970" 
                      className="text-[13.5px] text-primary hover:text-secondary font-mono font-semibold transition-colors"
                    >
                      +91 92069 70970
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Email</h4>
                    <a 
                      href="mailto:info@divyagems.in" 
                      className="text-[13.5px] text-primary hover:text-secondary font-semibold transition-colors"
                    >
                      info@divyagems.in
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21V2.25m0 18.75a9.002 9.002 0 0 0 5-16.747m-5 16.747a9.002 9.002 0 0 1-5-16.747M12 2.25a9.002 9.002 0 0 1 5 3.253m-5-3.253a9.002 9.002 0 0 0-5 3.253zm0 0v18.75" />
                  </svg>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Website</h4>
                    <a 
                      href="https://divyagems.in" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[13.5px] text-primary hover:text-secondary font-semibold transition-colors"
                    >
                      divyagems.in
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Business Hours</h4>
                    <p className="text-[13.5px] text-text-primary leading-relaxed">
                      Mon &ndash; Sat: 10:30 AM &ndash; 8:00 PM <br/>
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Tagline & Social Icons */}
              <div className="pt-6 border-t border-border space-y-5">
                <p className="font-display italic text-primary text-base sm:text-lg text-center lg:text-left leading-relaxed">
                  &ldquo;Guiding Lives Through Ancient Wisdom &amp; Positive Energy.&rdquo;
                </p>

                {/* Social Icon buttons */}
                <div className="flex justify-center lg:justify-start gap-3 select-none">
                  {/* Instagram */}
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-secondary hover:text-text-inverse transition-colors duration-200 cursor-pointer"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.752.052 2.73.124 4.091 1.503 4.215 4.215.044.968.052 1.322.052 3.752c0 2.43-.008 2.784-.052 3.752-.124 2.73-1.503 4.091-4.215 4.215-.968.044-1.322.052-3.752.052-2.43 0-2.784-.008-3.752-.052-2.73-.124-4.091-1.503-4.215-4.215C2.008 15.284 2 14.93 2 12.5c0-2.43.008-2.784.052-3.752.124-2.73 1.503-4.091 4.215-4.215.968-.044 1.322-.052 3.752-.052h.315zm0 1.8c-2.41 0-2.695.01-3.646.054-.233.01-.362.049-.446.082a2.422 2.422 0 00-.882.574 2.422 2.422 0 00-.574.882c-.033.085-.072.213-.082.446-.043.95-.054 1.237-.054 3.646 0 2.41 0 2.695.054 3.646.01.233.049.362.082.446.082.287.206.543.446.743.2.2.456.324.743.407.085.033.213.072.446.082.95.043 1.237.054 3.646.054 2.41 0 2.695-.01 3.646-.054.233-.01.362-.049.446-.082a2.422 2.422 0 00.882-.574c.2-.2.324-.456.407-.743.033-.085.072-.213.082-.446.043-.95.054-1.237.054-3.646 0-2.41-.01-2.695-.054-3.646-.01-.233-.049-.362-.082-.446a2.422 2.422 0 00-.574-.882 2.422 2.422 0 00-.882-.574c-.085-.033-.213-.072-.446-.082-.95-.043-1.237-.054-3.646-.054zm0 3.203a4.982 4.982 0 100 9.963 4.982 4.982 0 000-9.963zm0 8.163a3.181 3.181 0 110-6.362 3.181 3.181 0 010 6.362zm4.84-8.775a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" clipRule="evenodd" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-secondary hover:text-text-inverse transition-colors duration-200 cursor-pointer"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/919824645978" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-secondary hover:text-text-inverse transition-colors duration-200 cursor-pointer"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.01 2.001C6.485 2.001 2 6.48 2 12.006c0 1.93.546 3.731 1.493 5.275L2.04 22l4.898-1.413a9.927 9.927 0 005.071 1.414c5.526 0 10.011-4.478 10.011-10.005 0-5.526-4.485-10.005-10.01-10.005zm0 18.232c-1.677 0-3.32-.42-4.782-1.218l-.343-.186-2.9 0.835 0.843-2.784-.213-.347a8.195 8.195 0 01-1.285-4.527c0-4.527 3.69-8.21 8.225-8.21 4.536 0 8.225 3.683 8.225 8.21s-3.689 8.21-8.225 8.21z" clipRule="evenodd" />
                    </svg>
                  </a>

                  {/* Mail */}
                  <a 
                    href="mailto:info@divyagems.in" 
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-secondary hover:text-text-inverse transition-colors duration-200 cursor-pointer"
                    aria-label="Mail"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: GOOGLE MAP (bg-bg) ── */}
      <section className="py-12 md:py-16 bg-bg">
        <div className="container-app">
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.0578623381443!2d72.53243837477132!3d23.06070221490524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8350c302dc79%3A0x2277c8833a75c7cf!2sDivya%20Gems!5e1!3m2!1sen!2sin!4v1782904462898!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
              title="Divya Gems Ahmedabad Location Map"
            />
          </div>
        </div>
      </section>

    </div>
  );
}

export default Contact;
