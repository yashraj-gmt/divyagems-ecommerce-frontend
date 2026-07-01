import React, { useEffect } from 'react';

export function Toast({ message, type = 'success', onClose, duration = 5000 }) {
  useEffect(() => {
    if (!message || !onClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center justify-between gap-3 p-4 bg-white text-text-primary rounded-md shadow-hover border-l-4 min-w-[300px] max-w-md animate-slideDown select-none ${
        isSuccess ? 'border-accent-emerald' : 'border-secondary'
      }`}
      role="alert"
    >
      <div className="flex items-center gap-2.5">
        {/* Variant Icon */}
        {isSuccess ? (
          <svg className="w-5 h-5 text-accent-emerald shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <span className="text-sm font-medium leading-5">{message}</span>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="text-text-muted hover:text-primary transition-colors cursor-pointer w-6 h-6 flex items-center justify-center rounded-full hover:bg-bg/50 shrink-0"
        aria-label="Close notification"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default Toast;
