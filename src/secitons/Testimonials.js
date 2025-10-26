import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
const Testimonials = () => {
    return (_jsx("section", { id: "testimonials", className: "flex-center section-padding", children: _jsxs("div", { className: "w-full h-full md:px-10 px-5", children: [_jsx(TitleHeader, { title: "What People Say About Me?", sub: "\u2B50\uFE0F Customer feedback highlights" }), _jsx("div", { className: "lg:columns-3 md:columns-2 columns-1 mt-16", children: testimonials.map((testimonial, index) => (_jsx(GlowCard, { card: testimonial, index: index, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { children: _jsx("img", { src: testimonial.imgPath, alt: testimonial.name }) }), _jsxs("div", { children: [_jsx("p", { className: "font-bold", children: testimonial.name }), _jsx("p", { className: "text-gray-300 text-sm font-mono ", children: testimonial.role }), _jsx("p", { className: "text-white-50", children: testimonial.mentions })] })] }) }, index))) })] }) }));
};
export default Testimonials;
