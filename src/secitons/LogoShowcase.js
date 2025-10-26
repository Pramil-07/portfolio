import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { logoIconsList } from "../constants";
const LogoIcon = ({ icon }) => {
    return (_jsx("div", { className: "flex-none flex-center marquee-item", children: _jsx("img", { src: icon.imgPath, alt: icon.name }) }));
};
const LogoShowcase = () => (_jsxs("div", { className: "md:my-20 my-10 relative", children: [_jsx("div", { className: "gradient-edge" }), _jsx("div", { className: "gradient-edge" }), _jsx("div", { className: "marquee h-52", children: _jsxs("div", { className: "marquee-box md:gap-12 gap-5", children: [logoIconsList.map((icon, index) => (_jsx(LogoIcon, { icon: icon }, index))), logoIconsList.map((icon, index) => (_jsx(LogoIcon, { icon: icon }, index)))] }) })] }));
export default LogoShowcase;
