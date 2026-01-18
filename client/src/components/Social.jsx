import React from 'react';
import { ArrowDownRight } from 'lucide-react';

const Social = () => {
  const socialLinks = [
    { name: 'Instagram', url: '#' },
    { name: 'Twitter', url: '#' },
    { name: 'Facebook', url: '#' },
    { name: 'Linkedin', url: '#' },
  ];

  return (
    <section className="bg-white dark:bg-black py-24 px-6 md:px-12 text-black dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="flex items-center justify-between mb-16 relative">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Follow us on social media
            </h2>
            {/* Minimalist Squiggle (matches red squiggle in source) */}
            <svg className="absolute -bottom-4 left-0 w-32 h-4 text-zinc-500" viewBox="0 0 100 20">
              <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>

          {/* Decorative Asterisk */}
          <div className="hidden md:block text-zinc-300 dark:text-zinc-700 text-6xl font-black">
            *
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Featured Image with rounded corners */}
          <div className="rounded-[3rem] overflow-hidden aspect-square md:aspect-auto md:h-[600px] border border-black/5 dark:border-white/5 transition-colors duration-300">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
              alt="Gym training"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Right: Social Links List */}
          <div className="flex flex-col">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="group flex items-center justify-between py-8 border-b border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-colors duration-300"
              >
                <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter transition-transform group-hover:translate-x-2">
                  {social.name}
                </span>

                {/* Arrow Button Overlay */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
                  <ArrowDownRight className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:rotate-45" />
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Social;