import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const component = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".features-header > *", {
        scrollTrigger: {
          trigger: ".features-header",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.2
      });

      // Grid Items Animation
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15
      });
    }, component);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      id: '01',
      title: 'Track Progress',
      desc: 'Monitor your workouts, sets, reps, and weights to see real progress over time with high-fidelity tracking.',
    },
    {
      id: '02',
      title: 'Set Goals',
      desc: 'Define your fitness milestones and track your journey towards achieving them with precision.',
    },
    {
      id: '03',
      title: 'Analyze Data',
      desc: 'Get detailed insights and analytics about your fitness performance to optimize your daily routine.',
    }
  ];

  return (
    <section ref={component} className="py-24 px-6 md:px-12 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header - Matches the Hero Heading Style */}
        <div className="features-header flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Built for <br /> Performance.
          </h2>
          <p className="max-w-xs text-sm font-medium text-zinc-500 uppercase tracking-widest leading-relaxed">
            Everything you need to scale your fitness journey to the next level.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid md:grid-cols-3 gap-12 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="feature-card group border-t border-zinc-100 dark:border-zinc-800 pt-8 flex flex-col hover:border-black dark:hover:border-white transition-colors duration-500"
            >
              {/* Numbering instead of Emojis for a premium look */}
              <span className="text-xs font-black tracking-widest mb-6 text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                [{feature.id}]
              </span>

              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">
                {feature.title}
              </h3>

              <p className="text-zinc-500 text-sm leading-relaxed font-medium group-hover:text-zinc-700 transition-colors">
                {feature.desc}
              </p>

              {/* Minimalist Arrow Link */}
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
