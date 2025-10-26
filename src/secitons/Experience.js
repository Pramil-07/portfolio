import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expCards, } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
gsap.registerPlugin(ScrollTrigger);
const Experience = () => {
    useGSAP(() => {
        // Animate each timeline card
        gsap.utils.toArray(".timeline-card").forEach((card) => {
            gsap.from(card, {
                xPercent: -100,
                opacity: 0,
                transformOrigin: "left left",
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                },
            });
        });
        // Animate the timeline scaleY
        gsap.to(".timeline", {
            transformOrigin: "bottom bottom",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".timeline",
                start: "top center",
                end: "70% center",
                onUpdate: (self) => {
                    gsap.to(".timeline", {
                        scaleY: 1 - self.progress,
                    });
                },
            },
        });
        // Animate each expText
        gsap.utils.toArray(".expText").forEach((text) => {
            gsap.from(text, {
                opacity: 0,
                xPercent: 0,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: text,
                    start: "top 60%",
                },
            });
        }, "<");
    }, []);
    return (_jsx("section", { id: "experience", className: "flex-center md:mt-40 mt-20 section-padding xl:px-0", children: _jsxs("div", { className: "w-full h-full md:px-20 px-5", children: [_jsx(TitleHeader, { title: "Professional Work Experience", sub: "\uD83D\uDCBC My Career Overview" }), _jsx("div", { className: "mt-32 relative", children: _jsx("div", { className: "relative z-50 xl:space-y-32 space-y-10", children: expCards === null || expCards === void 0 ? void 0 : expCards.map((card) => {
                            var _a;
                            return (_jsxs("div", { className: "exp-card-wrapper", children: [_jsx("div", { className: "xl:w-2/6", children: _jsx(GlowCard, { index: (_a = card === null || card === void 0 ? void 0 : card.id) !== null && _a !== void 0 ? _a : 0, card: card, children: _jsx("div", { children: _jsx("img", { src: card.imgPath, alt: "exp-img", width: 150, height: 100, style: { borderRadius: "8px", objectFit: "contain" } }) }) }) }), _jsx("div", { className: "xl:w-4/6", children: _jsxs("div", { className: "flex items-start", children: [_jsxs("div", { className: "timeline-wrapper", children: [_jsx("div", { className: "timeline" }), _jsx("div", { className: "gradient-line w-1 h-full" })] }), _jsxs("div", { className: "expText flex xl:gap-20 md:gap-10 gap-5 relative z-20", children: [_jsx("div", { className: "timeline-logo", children: _jsx("img", { src: card.logoPath, alt: "logo" }) }), _jsxs("div", { children: [_jsx("h1", { className: "font-semibold text-3xl", children: card.title }), _jsxs("p", { className: "my-5 text-white-50", children: ["\uD83D\uDDD3\uFE0F\u00A0", card.date] }), _jsx("p", { className: "text-[#839CB5] italic", children: "Responsibilities" }), _jsx("ul", { className: "list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50", children: card.responsibilities.map((resp, index) => (_jsx("li", { className: "text-lg", children: resp }, index))) })] })] })] }) })] }, card.title));
                        }) }) })] }) }));
};
export default Experience;
