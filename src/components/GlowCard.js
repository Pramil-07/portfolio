import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
const GlowCard = ({ card, index, children }) => {
    // refs for all the cards
    const cardRefs = useRef([]);
    // when mouse moves over a card, rotate the glow effect
    const handleMouseMove = (index) => (e) => {
        const cardEl = cardRefs.current[index];
        if (!cardEl)
            return;
        const rect = cardEl.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        angle = (angle + 360) % 360;
        cardEl.style.setProperty("--start", (angle + 60).toString());
    };
    return (_jsxs("div", { ref: (el) => {
            cardRefs.current[index] = el;
        }, onMouseMove: handleMouseMove(index), className: "card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column", children: [_jsx("div", { className: "glow" }), _jsx("div", { className: "flex items-center gap-1 mb-5", children: Array.from({ length: 5 }, (_, i) => (_jsx("img", { src: "/images/star.png", alt: "star", className: "size-5" }, i))) }), _jsx("div", { className: "mb-5", children: _jsx("p", { className: "text-white-50 text-lg", children: card.review }) }), children] }));
};
export default GlowCard;
