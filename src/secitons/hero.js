import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { words } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../components/Button";
import AnimatedCounter from "../components/AnimatedCounter";
import HeroExperience from "../components/HeroModels/HeroExperience";
export const Hero = () => {
    useGSAP(() => {
        gsap.fromTo(".hero-text h1", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" });
    });
    return (_jsxs("section", { id: "hero", className: "relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 z-10", children: _jsx("img", { src: "/images/bg.png", alt: "" }) }), _jsxs("div", { className: "hero-layout", children: [_jsx("header", { className: "flex flex-col justify-center md:w-full w-screen md:px-20 px-5", children: _jsxs("div", { className: "flex flex-col gap-7", children: [_jsxs("div", { className: "hero-text", children: [_jsxs("h1", { children: [" Shaping", _jsx("span", { className: "slide", children: _jsx("span", { className: "wrapper", children: words.map((word, index) => (_jsxs("span", { className: "flex items-center md:gap-3 gap-1 pb-2", children: [_jsx("img", { src: word.imgPath, alt: "person", className: "xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50" }), _jsx("span", { children: word.text })] }, index))) }) })] }), _jsx("h1", { children: "into Real Projects that" }), _jsx("h1", { children: "Empower Businesses" })] }), _jsx("p", { className: "text-white-50 md:text-xl relative z-10 pointer-events-none", children: "Hi, I'm Pramil Dhunagan , Full Stack Developer Based in Kathmandu,Nepal" }), _jsx(Button, { text: "See My Work", className: "md:w-80 md:h-16 w-60 h-12", id: "counter" })] }) }), _jsx("figure", { children: _jsx("div", { className: "hero-3d-layout", children: _jsx(HeroExperience, {}) }) })] }), _jsx(AnimatedCounter, {})] }));
};
