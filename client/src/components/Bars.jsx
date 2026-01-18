import React from 'react'
import { ArrowDownRight } from 'lucide-react'

const Bars = () => {
  const listItems = [
    "Good Management",
    "Practice Videos",
    "Progress Report"
  ];

  return (
    <section className="bg-white dark:bg-black py-20 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-4">

        {/* Top Featured Card */}
        <div className="bg-zinc-100 dark:bg-white rounded-[3rem] md:rounded-full p-8 md:p-4 flex flex-col md:flex-row items-center relative overflow-hidden transition-colors duration-300">
          {/* Text Content */}
          <div className="flex-1 md:pl-12 z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black mb-4">
              Professional Trainer
            </h2>
            <p className="text-black/70 text-sm md:text-base font-medium max-w-md leading-relaxed">
              Through my client's fitness journey with me, I have coached many to achieve their fitness goals using a sustainable method to improve their overall health.
            </p>
          </div>

          {/* Decorative Asterisk */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="text-black/10 text-9xl font-black">*</span>
          </div>

          {/* Trainer Image */}
          <div className="mt-8 md:mt-0 md:mr-4 z-10">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-black/5 dark:border-white/5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop"
                alt="Trainer"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>

        {/* Action Bars */}
        <div className="space-y-4">
          {listItems.map((item, index) => (
            <div
              key={index}
              className="group bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 rounded-full py-4 px-8 md:py-6 md:px-12 flex items-center justify-between cursor-pointer border border-black/5 dark:border-white/5"
            >
              <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-black dark:text-white">
                {item}
              </h3>

              <div className="w-12 h-12 md:w-16 md:h-16 bg-black dark:bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowDownRight className="text-white dark:text-black w-6 h-6 md:w-8 md:h-8" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Bars