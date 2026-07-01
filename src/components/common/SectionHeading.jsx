import React from 'react';

export function SectionHeading({ eyebrow, title, align = 'center', className = '' }) {
  const isCenter = align === 'center';

  return (
    <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      {title && <h2 className="section-title">{title}</h2>}
      <div className="section-rule" />
    </div>
  );
}

export default SectionHeading;
