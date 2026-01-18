import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../ux/SlotMachineEffect.css';

const SlotMachineEffect = ({ text = "subscribe", className = "", as: Tag = "span" }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // gsap.context() is best practice in React for scoping selectors and cleanup
        const ctx = gsap.context(() => {
            const repeat = 8;
            const tl = gsap.timeline();
            const chars = containerRef.current.querySelectorAll('.char'); // Scoped thanks to ctx if we used scoped selector, but here we can rely on ctx or ref.

            chars.forEach((char, i) => {
                const original = char.querySelector('.original-text');
                const clone = char.querySelector('.clone-text');

                gsap.set(clone, {
                    yPercent: i % 2 === 0 ? -100 : 100
                });

                let roll = gsap.to([original, clone], {
                    repeat: repeat,
                    ease: "none",
                    yPercent: i % 2 === 0 ? "+=100" : "-=100",
                    duration: 1
                });

                tl.add(roll, 0);
            });

            gsap.to(tl, {
                progress: 1,
                duration: 4,
                ease: "power4.inOut"
            });

        }, containerRef); // Scope to containerRef

        return () => ctx.revert(); // Cleanup
    }, [text]); // Re-run if text changes

    return (
        <Tag className={`slot-machine-effect ${className}`} ref={containerRef}>
            {text.split('').map((char, i) => (
                <span className="char" key={i}>
                    <span className="original-text ">{char}</span>
                    <span className="clone-text ">{char}</span>
                </span>
            ))}
        </Tag>
    );
};

export default SlotMachineEffect;
