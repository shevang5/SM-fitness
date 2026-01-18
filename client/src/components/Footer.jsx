import React from 'react';
import { ArrowDownRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white pt-20 pb-10 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Call to Action Bar */}
        <div className="bg-zinc-100 dark:bg-white rounded-[3rem] p-6 md:p-12 mb-20 flex flex-col md:flex-row items-center justify-between group transition-colors duration-300">
          <div className="flex items-center gap-4 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none">
              Stay connected to us <br /> to get our offer
            </h2>
            <span className="text-black text-4xl md:text-6xl font-black">*</span>
          </div>

          <button className="relative w-32 h-32 md:w-40 md:h-40 bg-black dark:bg-zinc-900 rounded-full flex items-center justify-center transition-transform hover:scale-105">
            {/* Rotating Text Ring Simulation */}
            <div className="absolute inset-0 animate-[spin_8s_linear_infinite] opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text className="text-[10px] font-bold uppercase tracking-[0.2em] fill-white">
                  <textPath xlinkHref="#circlePath">Get in touch • Get in touch • </textPath>
                </text>
              </svg>
            </div>
            <ArrowDownRight className="w-10 h-10 text-white transition-transform group-hover:rotate-45" />
          </button>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <div className="text-3xl font-black tracking-tighter mb-6 uppercase"><img src="/images/gym logo.png" className='w-16 py-0 px-2 rounded-full bg-black' alt="" /></div>
            <p className="text-zinc-500 max-w-xs text-sm font-medium uppercase tracking-widest leading-relaxed">
              We are dedicated to helping you achieve your fitness goals and improve your overall health.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
              <li><a href="/#about" className="hover:text-zinc-400 transition">About</a></li>
              <li><a href="/#trainings" className="hover:text-zinc-400 transition">Trainings</a></li>
              <li><a href="/#pricing" className="hover:text-zinc-400 transition">Pricing</a></li>
              <li><a href="/#contact" className="hover:text-zinc-400 transition">Contacts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
              <li>(270) 555-0117</li>
              <li>gym@gmail.com</li>
              <li>2464 Royal Ln. Mesa, New Jersey</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-300">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            &copy; 2025 SAGAR Gym Tracker. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;