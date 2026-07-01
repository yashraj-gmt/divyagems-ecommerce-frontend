import React from 'react';

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-xs p-4 animate-fadeIn">
      {/* Backdrop Click Dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-white rounded-card shadow-hover p-6 max-w-lg w-full relative z-10 animate-riseIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-primary transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg/50"
          aria-label="Close Modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;