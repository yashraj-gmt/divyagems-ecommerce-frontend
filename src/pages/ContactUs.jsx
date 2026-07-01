import React, { useState } from 'react';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', interest: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-bg min-h-screen py-16">
      <div className="container-app">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest">Connect with Us</span>
          <h1 className="text-3xl md:text-5xl font-bold text-primary">Get in Touch</h1>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            Our gemstone concierges and Vedic pundits are available to answer your origin questions, certificate doubts, or provide custom astrological charts.
          </p>
        </div>

        {/* Form and Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-md border border-border shadow-card flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-primary mb-6">Send an Inquiry</h2>
              
              {submitted ? (
                <div className="bg-success/10 text-success p-6 rounded-md text-center space-y-2 mb-6 border border-success/30 animate-fadeIn">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-bold">Inquiry Sent Successfully!</h3>
                  <p className="text-xs">Our gem expert will reach back to you within 24 hours.</p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary uppercase tracking-wide">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Rahul Verma"
                      className="w-full text-sm border border-border bg-bg rounded px-3.5 py-2.5 outline-none focus:border-secondary transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary uppercase tracking-wide">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="e.g. +91 98246 45978"
                      className="w-full text-sm border border-border bg-bg rounded px-3.5 py-2.5 outline-none focus:border-secondary transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary uppercase tracking-wide">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. rahul@example.com"
                      className="w-full text-sm border border-border bg-bg rounded px-3.5 py-2.5 outline-none focus:border-secondary transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary uppercase tracking-wide">Gemstone of Interest</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full text-sm border border-border bg-bg rounded px-3.5 py-2.5 outline-none focus:border-secondary transition-all cursor-pointer"
                    >
                      <option>General Inquiry</option>
                      <option>Blue Sapphire (Neelam)</option>
                      <option>Burmese Ruby (Manik)</option>
                      <option>Colombian Emerald (Panna)</option>
                      <option>Yellow Sapphire (Pukhraj)</option>
                      <option>Diamond Recommendation</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-primary uppercase tracking-wide">Message details</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Specify astrological requirements, weight preferences, or custom mounting requests..."
                    className="w-full text-sm border border-border bg-bg rounded px-3.5 py-2.5 outline-none focus:border-secondary transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3.5 bg-primary text-white hover:bg-secondary text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-200 cursor-pointer shadow"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Details & Map */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Showroom Details Box */}
            <div className="bg-primary text-white p-6 md:p-8 rounded-md space-y-6 flex-grow">
              <h3 className="text-xl font-bold text-secondary">Showroom Coordinates</h3>
              
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <span className="text-secondary mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-bold text-secondary uppercase block text-xs tracking-wider mb-1">Corporate Showroom</span>
                    <span className="text-gray-300 leading-relaxed text-[13.5px]">
                      Divya Gems, Near Bhuyangdev BRTS Bus Stand, Ahmedabad, Gujarat - 380061.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="text-secondary mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-bold text-secondary uppercase block text-xs tracking-wider mb-1">Email Concierge</span>
                    <a href="mailto:info@divyagems.in" className="text-gray-300 hover:text-white text-[13.5px]">info@divyagems.in</a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="text-secondary mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622l.067-.02a2.25 2.25 0 0 1 2.25.356 2.25 2.25 0 0 1 .32 2.624l-.683 1.025a10.07 10.07 0 0 0 4.887 4.887l1.025-.683a2.25 2.25 0 0 1 2.624.32 2.25 2.25 0 0 1 .356 2.25l-.02.067a2.25 2.25 0 0 1-1.95 1.125 10.07 10.07 0 0 1-9.348-9.348 2.25 2.25 0 0 1 1.125-1.95z" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-bold text-secondary uppercase block text-xs tracking-wider mb-1">Phone / WhatsApp Helpline</span>
                    <a href="tel:9824645978" className="text-gray-300 hover:text-white text-[13.5px]">98246 45978</a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="text-secondary mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-bold text-secondary uppercase block text-xs tracking-wider mb-1">Operating Hours</span>
                    <span className="text-gray-300 text-[13.5px]">Monday - Saturday: 11:00 AM to 08:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Static map placeholder */}
            <div className="bg-white border border-border rounded-md overflow-hidden aspect-video relative flex items-center justify-center p-2 shadow-sm">
              <div className="absolute inset-0 bg-blue-50/50 flex flex-col items-center justify-center text-center p-4">
                <svg className="w-10 h-10 text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="text-xs font-semibold text-primary block uppercase">Ahmedabad Showroom Map</span>
                <span className="text-[11px] text-text-secondary mt-1">Near Bhuyangdev BRTS Bus Stand, Ahmedabad</span>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-3 text-[11px] bg-primary text-white px-4 py-1.5 rounded-sm font-bold uppercase hover:bg-secondary transition-all"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
