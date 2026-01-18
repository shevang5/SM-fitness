import React from 'react';
import { ArrowDownRight } from 'lucide-react';

const Trainer = () => {
  const services = [
    {
      title: "In-Person Coaching",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop", // Replace with actual image
      theme: "light" // White card
    },
    {
      title: "Online Coaching",
      image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop", // Replace with actual image
      theme: "dark" // Dark card
    }
  ];

  return (
    <section className="bg-white dark:bg-black py-24 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center text-black dark:text-white mb-16">
          How I Can Help You
        </h2>

        {/* Bio & Details */}
        <div className="max-w-4xl mx-auto mb-20">
          <p className="text-center text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-medium mb-12 leading-relaxed">
            With a wealth of experience in the health, fitness, and wellness industry,
            I am committed to creating customized exercise programs that cater to unique needs and goals.
            My expertise shines in promoting health and well-being, developing fitness routines that are not only effective but also safe.
          </p>

          {/* <div className="grid md:grid-cols-2 gap-8 text-black dark:text-white">
            <div className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-3xl">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-6 underline decoration-lime-500 underline-offset-4">
                Certifications
              </h3>
              <ul className="space-y-3 font-medium text-sm md:text-base text-zinc-700 dark:text-zinc-300">
                <li>• REPs Level 2 and 3</li>
                <li>• Certified Personal Fitness Trainer</li>
                <li>• Advanced Functional Training</li>
                <li>• ACSM Personal Trainer</li>
                <li>• K11 Personal Trainer</li>
                <li>• Kickboxing Coach</li>
              </ul>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-3xl">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-6 underline decoration-blue-500 underline-offset-4">
                Experience
              </h3>
              <ul className="space-y-3 font-medium text-sm md:text-base text-zinc-700 dark:text-zinc-300">
                <li>• Gold's Gym Personal Trainer</li>
                <li>• Level 2, 3 & 4 Certified Trainer</li>
                <li>• Functional Training Expert</li>
                <li>• Health & Fitness Coach</li>
                <li>• Customized Program Specialist</li>
              </ul>
            </div>
          </div> */}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative rounded-[3rem] overflow-hidden group transition-colors duration-300 ${service.theme === 'light' ? 'bg-zinc-100 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-900'
                }`}
            >
              {/* Image */}
              <div className="h-[400px] md:h-[500px]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Button Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div
                  className={`flex items-center justify-between rounded-full py-4 px-8 cursor-pointer transition-all duration-300 group-hover:-translate-y-2 ${service.theme === 'light'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-white text-black dark:bg-black dark:text-white'
                    }`}
                >
                  <span className="text-lg md:text-xl font-black uppercase tracking-tighter">
                    {service.title}
                  </span>
                  <ArrowDownRight
                    className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:rotate-45 ${service.theme === 'light'
                      ? 'text-white dark:text-black'
                      : 'text-black dark:text-white'
                      }`}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Trainer;