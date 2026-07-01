import React from 'react';

export function YantraMotif({ className = '', strokeWidth = 1, ...props }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={`select-none pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Outer Bhupura (Temple Gate Square Pattern) */}
      <path
        d="M 10 10 L 40 10 L 40 5 L 60 5 L 60 10 L 90 10 L 90 40 L 95 40 L 95 60 L 90 60 L 90 90 L 60 90 L 60 95 L 40 95 L 40 90 L 10 90 L 10 60 L 5 60 L 5 40 L 10 40 Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Concentric Circles */}
      <circle cx="50" cy="50" r="32" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="26" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Interlocking Triangles */}
      {/* Downward Triangle 1 */}
      <polygon points="50,25 28,68 72,68" strokeLinejoin="round" />
      {/* Upward Triangle 1 */}
      <polygon points="50,75 28,32 72,32" strokeLinejoin="round" />
      {/* Downward Triangle 2 */}
      <polygon points="50,33 34,62 66,62" strokeLinejoin="round" />
      {/* Upward Triangle 2 */}
      <polygon points="50,67 34,38 66,38" strokeLinejoin="round" />
      
      {/* Central Bindu (dot) */}
      <circle cx="50" cy="50" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default YantraMotif;
