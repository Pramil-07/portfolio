import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
const AppShowcase = () => {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);
    useGSAP(() => {
        // Animation for the main section
        gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
        // Animations for each app showcase
        const cards = [project1Ref.current, project2Ref.current, project3Ref.current];
        cards.forEach((card, index) => {
            gsap.fromTo(card, {
                y: 50,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.3 * (index + 1),
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom-=100",
                },
            });
        });
    }, []);
    return (_jsx("div", { id: "work", ref: sectionRef, className: "app-showcase", children: _jsx("div", { className: "w-full", children: _jsxs("div", { className: "showcaselayout", children: [_jsxs("div", { ref: project1Ref, className: "first-project-wrapper", children: [_jsx("div", { className: "image-wrapper", children: _jsx("img", { src: "/images/project1.png", alt: "Homaale Online Service Booking Platform" }) }), _jsxs("div", { className: "text-content", children: [_jsx("h2", { children: "Empowering People to Buy, Sell, and Offer Services Seamlessly with Homaale" }), _jsx("p", { className: "text-white-50 md:text-xl", children: "Homaale is a dynamic service and product marketplace built with Next.js, Django REST Framework, and PostgreSQL. It enables users to become merchants, create shops, and sell products or services \u2014 all within one powerful platform." })] })] }), _jsxs("div", { className: "project-list-wrapper overflow-hidden", children: [_jsxs("div", { className: "project", ref: project2Ref, children: [_jsx("div", { className: "image-wrapper bg-[#FFEFDB]", children: _jsx("img", { src: "/images/project2.png", alt: "Mitho Sweets Ecommerce Platform for sweets" }) }), _jsx("h2", { children: "The Ecommerce Platform to buy Sweets" })] }), _jsxs("div", { className: "project ", ref: project3Ref, children: [_jsx("div", { className: "image-wrapper bg-[#FFE7EB]", children: _jsx("img", { src: "/images/cagtu_cms.jpg", alt: "Cagtu CMS" }) }), _jsxs("div", { className: "text-content", children: [_jsx("h2", { children: "Cagtu CMS \u2014 An admin dashboard to manage multiple platforms effortlessly." }), _jsx("p", { className: "text-white-50 md:text-xl mt-2", children: "A unified CMS for managing multiple platforms easily." })] })] })] })] }) }) }));
};
export default AppShowcase;
