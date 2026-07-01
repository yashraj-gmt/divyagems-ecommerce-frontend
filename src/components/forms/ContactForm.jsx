import React, { useState } from 'react';
import Button from '../common/Button';
import YantraMotif from '../common/YantraMotif';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Phone validation (10 digit pattern)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Mobile number must be exactly 10 digits';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Message validation (min 10 characters)
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error dynamically on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate submission request
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }, 1500);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-10 px-4 space-y-5 animate-fadeIn">
        <div className="flex justify-center text-accent-emerald">
          <YantraMotif className="w-16 h-16" strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-display text-primary text-xl sm:text-2xl font-bold">
            Inquiry Received
          </h3>
          <p className="text-text-muted text-sm leading-relaxed max-w-sm mx-auto font-sans">
            Thank you for reaching out. Bharatbhai Khandhedia and our spiritual counselors will review your details and connect with you within 24 hours.
          </p>
        </div>

        <button 
          onClick={() => setIsSuccess(false)}
          className="text-xs font-semibold text-secondary hover:text-secondary-dark uppercase tracking-widest cursor-pointer underline pt-2 font-mono"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-sans" noValidate>
      {/* Name Input */}
      <div className="space-y-1">
        <label htmlFor="contact-name" className="block text-xs font-bold text-primary uppercase tracking-wider">
          Your Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Rahul Verma"
          className="w-full text-sm border bg-bg rounded-md px-3.5 py-2.5 outline-none transition-all duration-200"
          style={{
            borderColor: errors.name ? '#B23B3B' : '#E2D5B8',
            boxShadow: errors.name ? '0 0 0 1px #B23B3B' : 'none'
          }}
        />
        {errors.name && (
          <p className="text-xs font-medium" style={{ color: '#B23B3B' }}>
            {errors.name}
          </p>
        )}
      </div>

      {/* Mobile Input */}
      <div className="space-y-1">
        <label htmlFor="contact-phone" className="block text-xs font-bold text-primary uppercase tracking-wider">
          Mobile Number
        </label>
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. 9824645978"
          className="w-full text-sm border bg-bg rounded-md px-3.5 py-2.5 outline-none transition-all duration-200"
          style={{
            borderColor: errors.phone ? '#B23B3B' : '#E2D5B8',
            boxShadow: errors.phone ? '0 0 0 1px #B23B3B' : 'none'
          }}
        />
        {errors.phone && (
          <p className="text-xs font-medium" style={{ color: '#B23B3B' }}>
            {errors.phone}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-1">
        <label htmlFor="contact-email" className="block text-xs font-bold text-primary uppercase tracking-wider">
          Email Address
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. rahul@example.com"
          className="w-full text-sm border bg-bg rounded-md px-3.5 py-2.5 outline-none transition-all duration-200"
          style={{
            borderColor: errors.email ? '#B23B3B' : '#E2D5B8',
            boxShadow: errors.email ? '0 0 0 1px #B23B3B' : 'none'
          }}
        />
        {errors.email && (
          <p className="text-xs font-medium" style={{ color: '#B23B3B' }}>
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Input */}
      <div className="space-y-1">
        <label htmlFor="contact-message" className="block text-xs font-bold text-primary uppercase tracking-wider">
          Your Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly describe your Vastu, gemstone, or astrological concern..."
          className="w-full text-sm border bg-bg rounded-md px-3.5 py-2.5 outline-none transition-all duration-200 resize-none"
          style={{
            borderColor: errors.message ? '#B23B3B' : '#E2D5B8',
            boxShadow: errors.message ? '0 0 0 1px #B23B3B' : 'none'
          }}
        />
        {errors.message && (
          <p className="text-xs font-medium" style={{ color: '#B23B3B' }}>
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isSubmitting}
          className="!bg-btn hover:!bg-btn-hover text-xs uppercase tracking-wider font-bold min-h-[44px]"
        >
          Send Inquiry
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;
