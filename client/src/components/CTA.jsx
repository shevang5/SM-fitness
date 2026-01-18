import React from 'react'

const CTA = () => {
    return (
        <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Intro Bio */}
                <p className="text-center text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-medium mb-12 leading-relaxed">
                    With a wealth of experience in the health, fitness, and wellness industry,
                    I am committed to creating customized exercise programs that cater to unique needs and goals.
                    My expertise shines in promoting health and well-being, developing fitness routines that are not only effective but also safe.
                </p>

                {/* Info Cards */}
                <div className="grid md:grid-cols-2 gap-8 text-black dark:text-white mb-16">

                    {/* Certifications Card */}
                    <div className="flex flex-col justify-between bg-zinc-100 dark:bg-zinc-900 p-8 rounded-3xl border border-transparent hover:border-lime-500 transition-colors">
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-6 underline decoration-lime-500 underline-offset-4">
                                Certifications
                            </h3>
                            {/* ACSM Logo inside card */}
                            <div className="py-4 border-t border-zinc-200 dark:border-zinc-800">
                                <img
                                    src="/images/ACMS.png"
                                    alt="ACSM Logo"
                                    className="md:h-24 h-16 bg-white rounded-full w-auto object-contain "
                                />
                            </div>
                            <ul className="space-y-3 font-medium text-sm md:text-base text-zinc-700 dark:text-zinc-300 mb-8">
                                <li>• REPs Level 2 and 3</li>
                                <li>• Certified Personal Fitness Trainer</li>
                                <li>• Advanced Functional Training</li>
                                <li>• ACSM Personal Trainer</li>
                                <li>• K11 Personal Trainer</li>
                                <li>• Kickboxing Coach</li>
                            </ul>
                        </div>
                    </div>

                    {/* Experience Card */}
                    <div className="flex flex-col justify-between bg-zinc-100 dark:bg-zinc-900 p-8 rounded-3xl border border-transparent hover:border-blue-500 transition-colors">
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-6 underline decoration-blue-500 underline-offset-4">
                                Experience
                            </h3>
                            {/* Gold's Gym Logo inside card */}
                            <div className="py-4 border-t border-zinc-200 dark:border-zinc-800">
                                <img
                                    src="/images/goldsGym.png"
                                    alt="Gold's Gym Logo"
                                    className="md:h-24 h-16  w-auto object-contain "
                                />
                            </div>
                            <ul className="space-y-3 font-medium text-sm md:text-base text-zinc-700 dark:text-zinc-300 mb-8">
                                <li>• Gold's Gym fitness Trainer for 7 years</li>
                                <li>• Level 2, 3 & 4 Certified Trainer</li>
                                <li>• Functional Training Expert</li>
                                <li>• Health & Fitness Coach</li>
                                <li>• Customized Program Specialist</li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Final CTA Button */}
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 dark:text-white">
                        Ready to transform?
                    </h2>
                    <button className="bg-black dark:text-white cursor-pointer  text-white font-black py-4 px-10 rounded-full uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-lime-500/20">
                        Start Your Journey Now
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CTA