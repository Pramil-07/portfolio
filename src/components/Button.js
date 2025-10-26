import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Button = ({ text, className, id }) => {
    return (_jsx("a", { onClick: (e) => {
            e.preventDefault(); // Stop the link from jumping instantly
            const target = document.getElementById("counter"); // Find the section with ID "counter"
            // Only scroll if we found the section and an ID is passed in
            // taht prevents the contact button from scrolling to the top
            if (target && id) {
                const offset = window.innerHeight * 0.15; // Leave a bit of space at the top
                // Calculate how far down the page we need to scroll
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                // Scroll smoothly to that position
                window.scrollTo({ top, behavior: "smooth" });
            }
        }, className: `${className !== null && className !== void 0 ? className : ""} cta-wrapper`, children: _jsxs("div", { className: "cta-button group", children: [_jsx("div", { className: "bg-circle" }), _jsx("p", { className: "text", children: text }), _jsx("div", { className: "arrow-wrapper", children: _jsx("img", { src: "/images/arrow-down.svg", alt: "arrow" }) })] }) }));
};
export default Button;
