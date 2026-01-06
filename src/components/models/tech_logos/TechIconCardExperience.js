import { jsx as _jsx } from "react/jsx-runtime";
const TechIconCardExperience = ({ model }) => {
    return (_jsx("img", { src: model.modelPath, alt: model.name, className: "w-full h-full object-contain" }));
};
export default TechIconCardExperience;
