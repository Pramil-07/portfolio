import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TitleHeader = ({ title, sub }) => {
    return (_jsxs("div", { className: "flex flex-col items-center gap-5", children: [_jsx("div", { children: _jsx("h1", { className: "font-semibold md:text-5xl text-3xl text-center", children: title }) }), _jsx("div", { className: "hero-badge", children: _jsx("p", { children: sub }) })] }));
};
export default TitleHeader;
