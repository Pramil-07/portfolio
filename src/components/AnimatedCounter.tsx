import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { shouldReduceHeavyMotion } from "../utils/motion";
import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
    const counterRef = useRef<HTMLDivElement | null>(null);
    const countersRef = useRef<HTMLDivElement[]>([]);

    useGSAP(() => {
        if (shouldReduceHeavyMotion()) return;

        countersRef.current.forEach((counter, index) => {
            const el = counter.querySelector(".stats-number") as HTMLElement;
            const item = counterItems[index];
            const isDecimal = item.value % 1 !== 0;

            gsap.set(el, { innerText: isDecimal ? "0.0" : "0" });

            gsap.to(el, {
                innerText: item.value,
                duration: 2,
                ease: "power2.out",
                snap: { innerText: isDecimal ? 0.1 : 1 },
                scrollTrigger: {
                    trigger: counterRef.current,
                    start: "top 80%",
                },
                onComplete: () => {
                    el.textContent = `${item.value}${item.suffix}`;
                },
            });
        });
    }, []);

    return (
        <div id="counter" ref={counterRef} className="stats-row">
            {counterItems.map((item, index) => (
                <div
                    key={index}
                    ref={(el) => { if (el) countersRef.current[index] = el; }}
                    className="stats-item"
                >
                    <div className="stats-number">{item.value}{item.suffix}</div>
                    <div className="stats-label">{item.label}</div>
                </div>
            ))}
        </div>
    );
};

export default AnimatedCounter;
