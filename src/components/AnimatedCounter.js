import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { counterItems } from "../constants";
import CountUp from 'react-countup';
gsap.registerPlugin(ScrollTrigger);
const AnimatedCounter = () => {
    // ✅ Type the main container ref
    const counterRef = useRef(null);
    // ✅ Type the array of child refs
    const countersRef = useRef([]);
    useGSAP(() => {
        countersRef.current.forEach((counter, index) => {
            const numberElement = counter.querySelector(".counter-number");
            const item = counterItems[index];
            // Set initial value
            gsap.set(numberElement, { innerText: "0.0" });
            // Animate the count
            gsap.to(numberElement, {
                innerText: item.value / 10,
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
    return (_jsx("div", { id: "counter", ref: counterRef, className: "padding-x-lg xl:mt-0 mt-32", children: _jsx("div", { className: "mx-auto grid-4-cols", children: counterItems.map((item, index) => (_jsxs("div", { ref: (el) => { if (el)
                    (countersRef.current[index] = el); }, className: "bg-zinc-900 rounded-lg p-10 flex flex-col justify-center", children: [_jsx("div", { className: "counter-number text-white-50 text-5xl font-bold mb-2", children: _jsx(CountUp, { suffix: item.suffix, end: item.value }) }), _jsx("div", { className: "text-white-50 text-lg", children: item.label })] }, index))) }) }));
};
export default AnimatedCounter;
