import React from 'react';

const DEFAULT_FAQS = [
  {
    question: "How do I choose the right gemstone?",
    answer: "Choose according to the energetic attributes you want to invite, such as rose quartz for harmony, amethyst for calmness, or black obsidian for grounding protection."
  },
  {
    question: "Are all gemstones 100% natural?",
    answer: "Yes. Every single gemstone is sourced naturally from earth deposits, untreated, and is verified authentic. We do not sell synthetic or lab-grown imitations."
  },
  {
    question: "Can these gemstones be used for home décor?",
    answer: "Absolutely. They are perfect for placing in bowls, shelves, bedroom side tables, office desks, and wellness corners to clear the space's vibe."
  },
  {
    question: "What is the difference between raw and tumbled gems?",
    answer: "Raw gemstones preserve their natural, unpolished rough texture. Tumbled gems are polished to be smooth and pocket-friendly, ideal for grids or carrying."
  }
];

export function FAQ({ faqs = DEFAULT_FAQS, title = "Frequently Asked Questions", eyebrow = "CUSTOMER SUPPORT" }) {
  return (
    <section className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 md:p-8 relative z-10" aria-labelledby="faq-heading">
      <div className="max-w-3xl mb-8">
        {eyebrow && (
          <span className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-secondary font-bold">
            ✦ {eyebrow} ✦
          </span>
        )}
        <h2 id="faq-heading" className="font-display text-2xl md:text-3xl font-bold text-primary mt-2">
          {title}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {faqs.map((item, index) => (
          <div 
            key={index}
            className="group border border-border/60 rounded-xl p-4 bg-bg/15 transition-all duration-300 hover:border-secondary hover:bg-white hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center gap-4">
                <h4 className="text-xs sm:text-sm font-bold text-primary transition-colors duration-200 group-hover:text-secondary-dark">
                  {item.question}
                </h4>
                <span className="text-secondary group-hover:rotate-180 transition-transform duration-300 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </div>
              <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-40 group-hover:opacity-100">
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed border-t border-border/40 pt-2 mt-3 font-sans">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
