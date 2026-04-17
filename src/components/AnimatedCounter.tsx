import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { shouldReduceHeavyMotion } from "../utils/motion";

import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
    // ✅ Type the main container ref
    const counterRef = useRef<HTMLDivElement | null>(null);

    // ✅ Type the array of child refs
    const countersRef = useRef<HTMLDivElement[]>([]);

    useGSAP(() => {
        if (shouldReduceHeavyMotion()) {
            return;
        }

        countersRef.current.forEach((counter, index) => {
            const numberElement = counter.querySelector(".counter-number") as HTMLElement;
            const item = counterItems[index];

            // Set initial value
            gsap.set(numberElement, { innerText: "0.0" });

            // Animate the count
            gsap.to(numberElement, {
                innerText: item.value/10,
                duration: 2.5,
                ease: "power2.out",
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: "#counter",
                    start: "top center",
                },
                onComplete: () => {
                    numberElement.textContent = `${item.value}${item.suffix}`;
                },
            });
        });
    }, []);

    return (
        <div id="counter" ref={counterRef} className="padding-x-lg mt-10 md:mt-16">
            <div className="mx-auto grid-4-cols">
                {counterItems.map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => {if(el) (countersRef.current[index] = el)}}
                        className="bg-black-200 rounded-lg p-5 md:p-10 flex flex-col justify-center"
                    >
                        <div className="counter-number text-white-50 text-3xl md:text-5xl font-bold mb-2">
                            {item.value}{item.suffix}
                        </div>
                        <div className="text-white-50 text-sm md:text-lg">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default AnimatedCounter;
