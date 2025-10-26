import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons } from "../constants";
const TechStack = () => {
    // Animate the tech cards
    useGSAP(() => {
        gsap.fromTo(".tech-card", { y: 50, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
            stagger: 0.2,
            scrollTrigger: {
                trigger: "#skills",
                start: "top center",
            },
        });
    });
    return (_jsx("div", { id: "skills", className: "flex-center section-padding", children: _jsxs("div", { className: "w-full h-full md:px-10 px-5", children: [_jsx(TitleHeader, { title: "How I Can Contribute & My Key Skills", sub: "\uD83E\uDD1D What I Bring to the Table" }), _jsx("div", { className: "tech-grid mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6", children: techStackIcons.map((techStackIcon) => (_jsxs("div", { className: "card-border tech-card overflow-hidden group xl:rounded-full rounded-lg relative", children: [_jsx("div", { className: "tech-card-animated-bg absolute inset-0" }), _jsxs("div", { className: "tech-card-content relative flex flex-col justify-center items-center p-1", children: [_jsx("div", { className: "tech-icon-wrapper w-30 h-20", children: _jsx(TechIconCardExperience, { model: techStackIcon }) }), _jsx("div", { className: "padding-x w-full text-center mt-2", children: _jsx("p", { className: "text-white text-lg font-medium", children: techStackIcon.name }) })] })] }, techStackIcon.name))) })] }) }));
};
export default TechStack;
