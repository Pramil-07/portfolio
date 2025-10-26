import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { abilities } from "../constants";
const FeatureCards = () => (_jsx("div", { className: "w-full padding-x-lg", children: _jsx("div", { className: "mx-auto grid-3-cols", children: abilities.map(({ imgPath, title, desc }) => (_jsxs("div", { className: "card-border rounded-xl p-8 flex flex-col gap-4", children: [_jsx("div", { className: "size-14 flex items-center justify-center rounded-full", children: _jsx("img", { src: imgPath, alt: title }) }), _jsx("h3", { className: "text-white text-2xl font-semibold mt-2", children: title }), _jsx("p", { className: "text-white-50 text-lg", children: desc })] }, title))) }) }));
export default FeatureCards;
