import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';

/* Decorative inline SVG — subtle geometric yantra grid for the right panel */
const YantraDecor = () => (
  <svg
    viewBox="0 0 320 320"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className="w-full h-full opacity-20 text-secondary"
    aria-hidden="true"
  >
    <circle cx="160" cy="160" r="150" strokeDasharray="6 6" />
    <circle cx="160" cy="160" r="105" />
    <circle cx="160" cy="160" r="60" strokeDasharray="4 4" />
    <polygon points="160,30 280,260 40,260" />
    <polygon points="160,290 40,60 280,60" />
    <line x1="160" y1="10" x2="160" y2="310" />
    <line x1="10" y1="160" x2="310" y2="160" />
    <circle cx="160" cy="160" r="6" fill="currentColor" strokeWidth="0" />
  </svg>
);

/* Eased counter hook — triggers once when element enters viewport */
function useCountUp(target, duration = 1800, startOnView = false) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!startOnView || hasStarted) return;
    setHasStarted(true);

    const startTime = performance.now();
    const numericTarget = parseInt(String(target).replace(/\D/g, ''), 10);

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [startOnView, hasStarted, target, duration]);

  return count;
}

const stats = [
  { rawValue: 23,   suffix: '+', label: 'Years of Expertise',  icon: '✦', duration: 1400 },
  { rawValue: 10000, suffix: '+', label: 'Satisfied Clients',   icon: '✦', duration: 2000 },
  { rawValue: 50,   suffix: '+', label: 'Countries Served',    icon: '✦', duration: 1600 },
  { rawValue: 500,  suffix: '+', label: 'Gem Varieties',       icon: '✦', duration: 1800 },
];

/* Format large numbers: 10000 → 10K */
function formatCount(value, rawTarget) {
  if (rawTarget >= 10000) return `${Math.floor(value / 1000)}K`;
  return String(value);
}

/* Single animated stat card */
function StatCard({ stat, triggered, index }) {
  const count = useCountUp(stat.rawValue, stat.duration, triggered);
  const displayValue = formatCount(count, stat.rawValue);

  return (
    <div
      className="group flex flex-col items-center text-center p-5 sm:p-6 bg-white/80 backdrop-blur-xs border border-border rounded-2xl shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 cursor-default select-none"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="text-secondary text-xs mb-1 tracking-widest">{stat.icon}</span>
      <span className="font-display text-3xl sm:text-4xl font-bold text-primary leading-none mb-1 group-hover:text-secondary-dark transition-colors duration-300 tabular-nums">
        {displayValue}{stat.suffix}
      </span>
      <span className="text-[11px] sm:text-xs text-text-muted font-sans font-semibold uppercase tracking-wide leading-tight">
        {stat.label}
      </span>
    </div>
  );
}

export function AboutOverview() {
  const gridRef = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (triggered) return;
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section className="section bg-bg py-14 md:py-20 overflow-hidden">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ── LEFT: Content Column ── */}
          <div className="flex flex-col space-y-6">
            <SectionHeading
              eyebrow="OUR STORY"
              title="Bringing Positivity, Prosperity & Spiritual Harmony Since 2001"
              align="left"
            />

            {/* Stat Badge */}
            <div className="border-2 border-secondary bg-white rounded-card shadow-card py-3 px-5 inline-flex items-center gap-2.5 self-start transition-transform duration-300 hover:scale-105 select-none">
              <span className="font-display text-lg font-bold text-primary leading-none">23+ Years</span>
              <span className="text-[10px] text-text-secondary font-sans font-semibold tracking-wide uppercase leading-none border-l border-border pl-2.5">
                of Trusted Guidance
              </span>
            </div>

            {/* Body Copy */}
            <div className="space-y-4 text-text-secondary text-sm md:text-[15px] leading-relaxed">
              <p>
                Founded in 2001 by expert consultant{' '}
                <strong className="text-primary font-semibold">Bharatbhai Khandhedia</strong>,
                Divya Gems was established with a singular vision: to provide genuine, lab-certified
                natural gemstones and Vedic tools guiding individuals toward prosperity, spiritual
                alignment, and geopathic peace.
              </p>
              <p>
                Combining ancestral wisdom of ancient Indian Vedic astrology with rigorous scientific
                testing, Bharatbhai has spent over two decades prescribing potent astrological gems,
                designing geometric yantras, and implementing vastu remedies for thousands of global
                patrons.
              </p>
            </div>

            {/* Action Link */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 font-sans font-semibold text-secondary hover:text-secondary-dark hover:underline transition-colors duration-200 text-sm"
              >
                <span>Read Our Full Story</span>
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Decorative Stats Panel ── */}
          <div className="relative flex items-center justify-center">
            {/* Background yantra SVG */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <div className="w-72 h-72 sm:w-80 sm:h-80">
                <YantraDecor />
              </div>
            </div>

            {/* 2×2 animated stats grid */}
            <div
              ref={gridRef}
              className="relative z-10 grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-sm mx-auto"
            >
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} triggered={triggered} index={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutOverview;
