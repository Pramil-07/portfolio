import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { socialImgs } from "../constants";
const Footer = () => {
    return (_jsx("footer", { className: "footer", children: _jsxs("div", { className: "footer-container", children: [_jsx("div", { className: "flex flex-col justify-center", children: _jsx("p", { children: "Terms & Conditions" }) }), _jsx("div", { className: "socials", children: socialImgs.map((socialImg, index) => (_jsx("div", { className: "icon", children: _jsx("img", { src: socialImg.imgPath, alt: socialImg.name || "social icon" }) }, index))) }), _jsx("div", { className: "flex flex-col justify-center", children: _jsxs("p", { className: "text-center md:text-end", children: ["\u00A9 ", new Date().getFullYear(), " Adrian Hajdin. All rights reserved."] }) })] }) }));
};
export default Footer;
