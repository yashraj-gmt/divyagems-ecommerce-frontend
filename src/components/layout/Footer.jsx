import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/images/logo.png';

export function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const formattedMsg = userMsg.trim() || "Hello Divya Gems, I would like to inquire about Vastu remedies, gemstones, or astrology consultations.";
    const whatsappUrl = `https://wa.me/919824645978?text=${encodeURIComponent(formattedMsg)}`;
    window.open(whatsappUrl, '_blank');
    setUserMsg('');
    setIsOpen(false);
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const policyLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Term Of Service', path: '/terms-conditions' },
    { name: 'Disclaimer', path: '/disclaimer' },
    { name: 'Return & Refund Policy', path: '/return-policy' }
  ];

  return (
    <footer className="bg-[#151221] text-text-inverse pt-16 pb-8 mt-auto relative">
      <div className="container-app">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
          
          {/* Column 1: Logo & Contact */}
          <div className="lg:col-span-4 flex flex-col">
            {/* Logo Container in White Capsule */}
            <div className="mb-6">
              <div className="bg-white p-2 px-4 rounded-sm inline-block shadow-sm">
                <img 
                  src={logo} 
                  alt="Divya Gems" 
                  className="h-9 w-auto object-contain" 
                />
              </div>
            </div>
            
            {/* Column-specific Divider Line */}
            <div className="border-t border-gray-800 w-full max-w-[320px] mb-6"></div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-gray-400 mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </span>
                <span className="text-[14px] text-gray-300 leading-relaxed max-w-[280px] text-left">
                  Divya Gems, Near Bhuyangdev BRTS Bus Stand, Ahmedabad, Gujarat - 380061.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                <a 
                  href="mailto:info@divyagems.in" 
                  className="text-[14px] text-gray-300 hover:text-secondary transition-colors"
                >
                  info@divyagems.in
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622l.067-.02a2.25 2.25 0 0 1 2.25.356 2.25 2.25 0 0 1 .32 2.624l-.683 1.025a10.07 10.07 0 0 0 4.887 4.887l1.025-.683a2.25 2.25 0 0 1 2.624.32 2.25 2.25 0 0 1 .356 2.25l-.02.067a2.25 2.25 0 0 1-1.95 1.125 10.07 10.07 0 0 1-9.348-9.348 2.25 2.25 0 0 1 1.125-1.95z" />
                  </svg>
                </span>
                <a 
                  href="tel:9824645978" 
                  className="text-[14px] text-gray-300 hover:text-secondary transition-colors"
                >
                  98246 45978
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col items-start lg:pl-4 text-left">
            <h3 className="text-[18px] font-semibold text-white tracking-wide mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name} className="flex items-center gap-3 group">
                  <span className="text-secondary text-[11px] font-bold select-none transition-transform duration-200 group-hover:translate-x-1">
                    &gt;
                  </span>
                  <Link 
                    to={link.path} 
                    className="text-[14px] text-gray-300 hover:text-secondary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Policies */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h3 className="text-[18px] font-semibold text-white tracking-wide mb-6">
              Our Policies
            </h3>
            <ul className="space-y-4">
              {policyLinks.map((link) => (
                <li key={link.name} className="flex items-center gap-3 group">
                  <span className="text-secondary text-[11px] font-bold select-none transition-transform duration-200 group-hover:translate-x-1">
                    &gt;
                  </span>
                  <Link 
                    to={link.path} 
                    className="text-[14px] text-gray-300 hover:text-secondary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 flex flex-col items-start text-left space-y-4">
            <h3 className="text-[18px] font-semibold text-white tracking-wide mb-2">
              Newsletter
            </h3>
            <p className="text-[14px] text-gray-300 leading-relaxed">
              Subscribe to receive planetary alignment alerts and custom gemstone insights.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3.5 mt-2 select-none">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-secondary transition-colors duration-200 cursor-pointer"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-secondary transition-colors duration-200 cursor-pointer"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.752.052 2.73.124 4.091 1.503 4.215 4.215.044.968.052 1.322.052 3.752c0 2.43-.008 2.784-.052 3.752-.124 2.73-1.503 4.091-4.215 4.215-.968.044-1.322.052-3.752.052-2.43 0-2.784-.008-3.752-.052-2.73-.124-4.091-1.503-4.215-4.215C2.008 15.284 2 14.93 2 12.5c0-2.43.008-2.784.052-3.752.124-2.73 1.503-4.091 4.215-4.215.968-.044 1.322-.052 3.752-.052h.315zm0 1.8c-2.41 0-2.695.01-3.646.054-.233.01-.362.049-.446.082a2.422 2.422 0 00-.882.574 2.422 2.422 0 00-.574.882c-.033.085-.072.213-.082.446-.043.95-.054 1.237-.054 3.646 0 2.41 0 2.695.054 3.646.01.233.049.362.082.446.082.287.206.543.446.743.2.2.456.324.743.407.085.033.213.072.446.082.95.043 1.237.054 3.646.054 2.41 0 2.695-.01 3.646-.054.233-.01.362-.049.446-.082a2.422 2.422 0 00.882-.574c.2-.2.324-.456.407-.743.033-.085.072-.213.082-.446.043-.95.054-1.237.054-3.646 0-2.41-.01-2.695-.054-3.646-.01-.233-.049-.362-.082-.446a2.422 2.422 0 00-.574-.882 2.422 2.422 0 00-.882-.574c-.085-.033-.213-.072-.446-.082-.95-.043-1.237-.054-3.646-.054zm0 3.203a4.982 4.982 0 100 9.963 4.982 4.982 0 000-9.963zm0 8.163a3.181 3.181 0 110-6.362 3.181 3.181 0 010 6.362zm4.84-8.775a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-secondary transition-colors duration-200 cursor-pointer"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright section */}
        <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-[13px] text-gray-400 text-center">
            Copyright © 2025 Divyagems.in | Powered by <span className="font-semibold text-white">Sanskritix.</span>
          </p>
        </div>
      </div>

      {/* Floating WhatsApp Support Button & Interactive Popup Chat Box */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
        
        {/* Expanded Chat Box Window */}
        {isOpen && (
          <div className="w-80 bg-white rounded-2xl shadow-2xl border border-border/80 overflow-hidden animate-fadeIn flex flex-col text-left">
            {/* Header: WhatsApp green */}
            <div className="bg-[#075E54] text-white p-4 flex items-center gap-3 relative select-none">
              {/* Consultant Icon Avatar */}
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/25 flex items-center justify-center font-bold text-sm shrink-0">
                DG
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight text-white">Divya Gems Help</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0" />
                  <span className="text-[10px] text-white/90 font-medium">Online &bull; Quick Replies</span>
                </div>
              </div>
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-white/70 hover:text-white cursor-pointer text-base font-mono font-bold"
                aria-label="Close chat"
              >
                &times;
              </button>
            </div>

            {/* Chat Body Bubble */}
            <div className="p-4 bg-[#ECE5DD] min-h-[110px] flex flex-col justify-start">
              <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-xs max-w-[90%] text-xs leading-relaxed text-text-primary">
                <p className="font-medium text-secondary-dark mb-1">Support Agent</p>
                <p>Namaste! Welcome to Divya Gems. 🙏</p>
                <p className="mt-1">How can we guide you today with certified gemstones, Vastu remedies, or Birth Kundli consultations?</p>
              </div>
            </div>

            {/* Input Message Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-border bg-white flex gap-2 items-center">
              <input
                type="text"
                placeholder="Type your message..."
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                className="flex-1 border border-border/80 bg-bg rounded-full px-3.5 py-1.5 text-xs text-text-primary outline-none focus:border-secondary transition-all"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs hover:bg-[#20ba5a] transition-colors cursor-pointer shrink-0"
                aria-label="Send to WhatsApp"
              >
                <svg className="w-4 h-4 fill-current transform rotate-45 translate-x-px -translate-y-px" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* Toggle Floating button */}
        <div className="flex items-center group">
          {!isOpen && (
            <span className="mr-3 scale-0 origin-right group-hover:scale-100 transition-all duration-200 bg-white text-primary text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md select-none border border-border pointer-events-none">
              Chat with Us
            </span>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer ${
              isOpen ? 'bg-primary' : 'bg-[#25D366]'
            }`}
            aria-label={isOpen ? "Close Support chat" : "Open WhatsApp chat support"}
          >
            {/* Pulsing ring under button (only when closed) */}
            {!isOpen && (
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 -z-10" />
            )}

            {isOpen ? (
              // Close X SVG
              <span className="text-xl font-mono font-bold">&times;</span>
            ) : (
              // WhatsApp logo SVG
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.727-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.003-2.637-1.01-5.114-2.853-6.958C16.838 2.012 14.365.996 11.999.996c-5.442 0-9.87 4.414-9.874 9.86-.002 1.706.452 3.375 1.319 4.814L2.43 21.05l5.817-1.526zM17.487 14.4c-.3-.15-1.782-.88-2.062-.98-.28-.1-.485-.15-.685.15-.2.3-.775.98-.95 1.18-.175.2-.35.225-.65.075-.3-.15-1.263-.465-2.407-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.018-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.687-1.657-.942-2.272-.247-.593-.5-.51-.685-.52-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.07 2.9 1.215 3.1c.145.2 2.105 3.213 5.097 4.5 1.143.493 1.83.65 2.52.544.755-.113 2.293-.938 2.618-1.844.325-.906.325-1.68.225-1.84-.1-.16-.35-.26-.65-.41z" />
              </svg>
            )}
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
