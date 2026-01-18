import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SlotMachineEffect from './ux/SlotMachineEffect'

const Hero = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const tl = gsap.to(marquee, {
      xPercent: -50,
      repeat: -1,
      duration: 15,
      ease: "none",
    });

    return () => tl.kill();
  }, []);

  return (
    <section className="bg-grid dark:bg-black py-10 px-6 md:px-12 relative transition-colors duration-300">
      <div className='flex items-center justify-center'>

        <button className="relative w-32 h-32 md:w-40 md:h-40 bg-black dark:bg-zinc-900 rounded-full flex items-center justify-center transition-transform hover:scale-105">
          {/* Rotating Text Ring Simulation */}
          <div className="absolute inset-0 animate-[spin_8s_linear_infinite] opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text className="text-[10px] font-bold uppercase tracking-[0.2em] fill-white">
                <textPath xlinkHref="#circlePath"> •  •  • SAGAR •  •  • MAHYAVANSHI • </textPath>
              </text>
            </svg>
          </div>
          <img src="/images/gym logo.png" className='w-16 h-16 text-white transition-transform group-hover:rotate-45' alt="" srcset="" />
          {/* <ArrowDownRight className="w-10 h-10 text-white transition-transform group-hover:rotate-45" /> */}
        </button>
      </div>
      <div className=' h-[60vh] md:h-[65vh] w-full overflow-hidden' >
        <div className='md:h-[80%] h-[65%] relative w-full flex items-center' >
          {/* Side Gradients */}
          <div className='absolute inset-y-0 left-0 w-24 md:w-32 bg-linear-to-r from-white dark:from-black to-transparent z-20 pointer-events-none'></div>
          <div className='absolute inset-y-0 right-0 w-24 md:w-32 bg-linear-to-l from-white dark:from-black to-transparent z-20 pointer-events-none'></div>

          <div ref={marqueeRef} className='flex whitespace-nowrap will-change-transform'>
            {/* First Set */}
            <div className='flex gap-[5vw] px-[2.5vw] shrink-0'>
              <h1 className='text-[50vw] md:text-[35vw] leading-0 text-blue-500  font-morganite uppercase text-center shrink-0'>
                SAGAR
              </h1>
              <h1 className='text-[50vw] [-webkit-text-stroke:1px_black] text-white md:text-[35vw] leading-0  font-morganite uppercase text-center shrink-0'>
                MAHYAVANSHI
              </h1>
            </div>
            {/* Second Set (Duplicate for seamless loop) */}
            <div className='flex gap-[5vw] px-[2.5vw] shrink-0'>
              <h1 className='text-[50vw] md:text-[35vw] leading-0 text-blue-500  font-morganite uppercase text-center shrink-0'>
                SAGAR
              </h1>
              <h1 className='text-[50vw] [-webkit-text-stroke:1px_black] text-white md:text-[35vw] leading-0  font-morganite uppercase text-center shrink-0'>
                MAHYAVANSHI
              </h1>
            </div>
          </div>
          <img className='absolute left-1/2 -translate-x-1/2 bottom-0 w-[300px] md:w-[400px] z-10' src="/images/heroImg.png" alt="" srcset="" />
        </div>
        <div className='h-[10%] flex flex-col items-center justify-center' >
          <div className='md:w-[50%] w-[100%]  border-2 border-black dark:border-white leading-none dark:bg-black bg-white  p-4 md:py-2 z-40  uppercase text-center rounded-full'>
            <p className='font-medium text-xs text-zinc-500'>CERTIFIED </p>
            <h2 className='md:text-[3vw] font-akira text-[10vw]'>
              FITNESS COACH
              {/* <p className='text-[1vw] font-bbh-bartle uppercase text-center rounded-full'>SAGAR MAHYAVANSHi</p> */}
            </h2>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero