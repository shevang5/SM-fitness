import React from 'react';
import { ArrowDownRight, Check } from 'lucide-react';

const Plans = () => {
  return (
    <section className="bg-white dark:bg-black h-screen flex items-center py-34 px-6 md:px-12 text-black dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Column: Header & Secondary Plans */}
        <div className="space-y-8">
          <div className="relative">
            {/* Decorative Squiggle (Simplified SVG) */}
            <svg className="absolute top-0 left-48 w-16 h-4 text-black/50 dark:text-white/50" viewBox="0 0 100 20">
              <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>

            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Member <br /> Pricing Plan
            </h2>
            <p className="mt-6 text-zinc-500 max-w-xs font-medium uppercase tracking-widest text-xs">
              We provide plans for those of you who want training with us.
            </p>

            {/* Decorative Asterisk */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-black/20 dark:text-white/20 text-5xl font-black">
              *
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <PriceCard amount="90" duration="Weekly" />
            <PriceCard amount="300" duration="Monthly" />
          </div>
        </div>

        {/* Right Column: Featured Plan & Yearly */}
        <div className="space-y-6">
          {/* Featured Daily Plan - Replaced Red with White/Black theme */}
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] p-10 flex flex-col h-fit border border-black/5 dark:border-white/5 transition-colors duration-300">
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-6xl font-black tracking-tighter">$20</span>
              <span className="text-xl font-bold uppercase tracking-widest text-zinc-400">Daily</span>
            </div>

            <ul className="space-y-4 mb-10">
              {['Watch daily video', 'Talk with coach', 'Free consulting'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                  <Check className="w-4 h-4 text-black dark:text-white" />
                  {item}
                </li>
              ))}
            </ul>

            <button className="w-full bg-black text-white dark:bg-white dark:text-black py-6 rounded-full flex items-center justify-center gap-2 group hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
              <span className="font-black uppercase tracking-widest text-sm">Join Now</span>
              <ArrowDownRight className="w-6 h-6 transition-transform group-hover:rotate-45" />
            </button>
          </div>

          <PriceCard amount="700" duration="Yearly" />
        </div>

      </div>
    </section>
  );
};

// Sub-component for smaller price cards
const PriceCard = ({ amount, duration }) => (
  <div className="bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-[2.5rem] p-8 flex items-center justify-between transition-colors group cursor-pointer">
    <div className="flex items-baseline gap-3">
      <span className="text-4xl md:text-5xl font-black tracking-tighter">${amount}</span>
      <span className="text-sm md:text-base font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
        {duration}
      </span>
    </div>
    <div className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
      <ArrowDownRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
    </div>
  </div>
);

export default Plans;
